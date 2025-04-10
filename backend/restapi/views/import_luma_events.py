from django.contrib.auth.views import csrf_protect
from django.http import JsonResponse
from restapi.serializers import EventSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from restapi.models import Club, Event
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium import webdriver
from bs4 import BeautifulSoup
from typing import List, Dict
from time import sleep
import re
from dateutil.parser import parse as parse_date
from rest_framework.generics import get_object_or_404
from datetime import timedelta, datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_protect
def import_luma_events(request):
    # Get the club from session (linked to logged-in user)
    club_id = request.session.get('id')
    if not club_id:
        return JsonResponse({"error": "You must be logged in as a club."}, status=401)

    club_instance = get_object_or_404(Club, user_id=club_id)
    print(type(club_instance))

    if not club_instance:
        return JsonResponse({"error": "Organization name is required"}, status=400)

    # Normalize and scrape Luma events
    normalized_name = normalize_club_name(club_instance.club_name)
    scraped_events = get_luma_events(normalized_name)

    created_events = []
    for e in scraped_events:
        start_time = parse_date_with_relative_terms(e['date'])

        # Check for duplicates
        if not Event.objects.filter(title=e['title'], start_time=start_time, club=club_instance).exists():
            event = Event.objects.create(
                title=e['title'],
                start_time=start_time,
                end_time=start_time,
                location=e['location'],
                capacity=100,
                description=f"Imported from Luma: {e.get('link', '')}",
                club=club_instance
            )
            created_events.append(event)

    serialized = EventSerializer(created_events, many=True)
    return JsonResponse({"events": serialized.data})



def get_luma_events(org_name: str) -> List[Dict[str, str]]:
    """Fetch and scrape events from a given Luma organization using Selenium."""
    normalized_name = normalize_club_name(org_name)

    base_url = f"https://lu.ma/user/{normalized_name}"
    
    # Setup Selenium WebDriver with Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(base_url)
    
    sleep(5)  # Allow time for the page to load

    all_events = []

    # Find all event lists
    event_lists = driver.find_elements(By.XPATH, "//div[contains(@class, 'event-list')]")
    
    if not event_lists:
        driver.quit()
        return []

    for index, event_list in enumerate(event_lists):
        # Check if there's a "View All" button in this event-list
        try:
            view_all_button = event_list.find_element(By.XPATH, ".//div[contains(text(), 'View All')]")
            driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", view_all_button)
            sleep(1)
            driver.execute_script("arguments[0].click();", view_all_button)
            sleep(2)

            # Wait for the modal to appear
            modal = WebDriverWait(driver, 5).until(
                EC.visibility_of_element_located((By.XPATH, "//div[contains(@class, 'lux-modal-body')]"))
            )

            # Extract events from the modal
            all_events.extend(scrape_events_from_modal(driver))

            # Close the modal
            try:
                close_button = WebDriverWait(driver, 5).until(
                    EC.element_to_be_clickable((By.XPATH, "//button[contains(@class, 'lux-modal-close')]"))
                )
                driver.execute_script("arguments[0].click();", close_button)
                sleep(2)
            except:
                ActionChains(driver).send_keys("\ue00C").perform()  # Close using ESC key
                sleep(2)

        except:
            # If no "View All" button, scrape directly from event-list
            all_events.extend(scrape_events_from_event_list(event_list))

    driver.quit()
    return all_events


def scrape_events_from_event_list(event_list) -> List[Dict[str, str]]:
    """Extracts events from a visible event list."""
    soup = BeautifulSoup(event_list.get_attribute("outerHTML"), "html.parser")
    events = []

    event_rows = soup.find_all("div", class_=lambda x: x and "event-row" in x)

    for event in event_rows:
        title_tag = event.find("div", class_=lambda x: x and "event-title" in x)
        title = title_tag.text.strip() if title_tag else "No Title"

        link_tag = event.find("a", href=True)
        href = link_tag["href"] if link_tag else ""
        full_link = f"https://lu.ma{href}" if href.startswith("/") else href if href else "No Link"

        meta_row = event.find("div", class_="jsx-2360576654 meta-row min-width-0 flex-center")
        if meta_row:
            date_tag = meta_row.find("span", class_="jsx-749509546")
            date = date_tag.text.strip() if date_tag else "Date not found"

            location_tag = meta_row.find("div", class_="jsx-2360576654 text-ellipses")
            location = location_tag.text.strip() if location_tag else "Location not found"
        else:
            date = "Date not found"
            location = "Location not found"

        events.append({
            "title": title,
            "date": date,
            "location": location,
            "link": full_link
        })

    return events


def scrape_events_from_modal(driver) -> List[Dict[str, str]]:
    """Extracts events from a modal after clicking 'View All'."""
    events = []
    modal_element = driver.find_element(By.XPATH, "//div[contains(@class, 'lux-modal-body')]")

    # Scroll to load all events
    last_height = driver.execute_script("return arguments[0].scrollHeight", modal_element)

    while True:
        driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", modal_element)
        sleep(2)
        new_height = driver.execute_script("return arguments[0].scrollHeight", modal_element)
        if new_height == last_height:
            break
        last_height = new_height

    sleep(3)  # Allow last elements to load
    soup = BeautifulSoup(driver.page_source, "html.parser")
    
    event_rows = soup.find_all("div", class_=lambda x: x and "event-row" in x)

    for event in event_rows:
        title_tag = event.find("div", class_=lambda x: x and "event-title" in x)
        title = title_tag.text.strip() if title_tag else "No Title"

        link_tag = event.find("a", href=True)
        href = link_tag["href"] if link_tag else ""
        full_link = f"https://lu.ma{href}" if href.startswith("/") else href if href else "No Link"

        meta_row = event.find("div", class_="jsx-2360576654 meta-row min-width-0 flex-center")
        host_meta_row = event.find("div", class_="jsx-3575689807 text-ellipses")
        if meta_row:
            date_tag = meta_row.find("span", class_="jsx-749509546")
            date = date_tag.text.strip() if date_tag else "Date not found"

            location_tag = meta_row.find("div", class_="jsx-2360576654 text-ellipses")
            location = location_tag.text.strip() if location_tag else "Location not found"
        else:
            date = "Date not found"
            location = "Location not found"

        if host_meta_row:
            host_tag = host_meta_row.find("div", class_="text-ellipses nowrap")
            host = host_tag.text.strip() if host_tag else "Host not found"
        else:
            host = "Host not found"

        events.append({
            "title": title,
            "date": date,
            "location": location,
            "link": full_link
        })

    return events

def normalize_club_name(club_name: str) -> str:
    """
    Normalize the club name to match Luma's URL format.
    - Converts to lowercase
    - Removes spaces and special characters
    - Joins words together without separators
    """
    club_name = club_name.strip().lower()  # Trim spaces and convert to lowercase
    club_name = re.sub(r"[^\w\s]", "", club_name)  # Remove special characters
    club_name = re.sub(r"\s+", "", club_name)  # Remove all spaces
    return club_name

def parse_date_with_relative_terms(date_string: str) -> datetime:
    """Parse date strings with relative terms like 'Yesterday', 'Today', and default date formats."""
    
    # Handle "Yesterday" by converting to the actual date
    if "Yesterday" in date_string:
        date_string = re.sub(r"Yesterday", (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d"), date_string)
    
    # Handle "Today" by converting to the actual date
    elif "Today" in date_string:
        date_string = re.sub(r"Today", datetime.now().strftime("%Y-%m-%d"), date_string)

    try:
        # Now parse the date, this will handle actual date formats as well
        return parse_date(date_string)
    except ValueError:
        # If parsing fails, raise a more specific error
        raise ValueError(f"Unrecognized date format: {date_string}")
