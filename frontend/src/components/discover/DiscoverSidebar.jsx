import React, {useContext, useEffect, useState} from "react";
import SidebarCard from "./SidebarCard";
import backend from "../backend.jsx";
import {UserContext} from "../../context/UserContext.jsx";
import dummyInitLogo from "../../assets/dummyInitLogo.png";

const DiscoverSidebar = () => {

  const [newClubs, setNewClubs] = useState([])
  const [recommendedClubs, setRecommendedClubs] = useState([])

  const initialShowCardsLimit = 3;

  const [showNewCardsLimit, setShowNewCardsLimit] = useState(
    initialShowCardsLimit
  );
  const [showRecommendedCardsLimit, setShowRecommendedCardsLimit] = useState(
    initialShowCardsLimit
  );

  const {userContext} = useContext(UserContext)

  // If the limit is equal to the initial limit, show all events, otherwise show the initial limit
  const toggleNewClubs = () => {
    setShowNewCardsLimit((prevLimit) =>
      prevLimit === initialShowCardsLimit
        ? newClubs.length
        : initialShowCardsLimit
    );
  };
  const toggleRecommendedClubs = () => {
    setShowRecommendedCardsLimit((prevLimit) =>
      prevLimit === initialShowCardsLimit
        ? recommendedClubs.length
        : initialShowCardsLimit
    );
  };


useEffect(() => {
  const fetchData = async () => {
    try {
      const newClubsRes = await backend.get('get-new-clubs/');
      setNewClubs(newClubsRes.data);

      if (userContext) {  // or userContext?.user
        const recommendedClubsRes = await backend.get('get-recommended-clubs/');
        setRecommendedClubs(recommendedClubsRes.data);
      }

    } catch (error) {
      console.error('Failed to fetch clubs:', error);
    }
  };

  fetchData();
}, [userContext?.isAuthenticated]);  // Re-run when auth status changes

  return (
    <div className="absolute w-[278px] h-[calc(100vh-80px)] top-[80px] overflow-y-auto left-0 bg-[#4D9FFD] border border-black shadow-[4px_4px_0px_#000000] p-4">
        {/* New Events Section */}
        <div className="flex flex-col items-center">
          <div>
            <h2 className="font-normal text-[26px] leading-[31px] text-black mb-2">
              New
            </h2>
            <div className="flex flex-col gap-3">
              {newClubs.slice(0, showNewCardsLimit).map((club) => (
                  <SidebarCard
                      key={club.club_name}
                      name={club.club_name}
                      image={club.club_picture || dummyInitLogo}
                  />
              ))}
            </div>
            {/* Only show the button if there are more events than the initial limit */}
            {newClubs.length > initialShowCardsLimit && (
                <button>
                  <p
                    className="mt-3 text-white hover:text-sky-100 text-sm font-medium"
                    onClick={toggleNewClubs}
                  >
                    {showNewCardsLimit === initialShowCardsLimit
                      ? "Show All"
                      : "Show Less"}
                  </p>
                </button>
            )}
          </div>
        </div>

        {/* Featured Events Section */}
        <div className="flex flex-col items-center">
          <div className="mt-2 ">
            {userContext &&
                <h2 className="font-normal text-[26px] leading-[31px] text-black mb-2">Recommended</h2>
            }
            <div className="flex flex-col gap-3">
              {recommendedClubs.slice(0, showRecommendedCardsLimit).map((recommendedClub) => (
                  <SidebarCard
                      key={recommendedClub.club_name}
                      name={recommendedClub.club_name}
                      image={recommendedClub.club_picture || dummyInitLogo}
                  />
              ))}
            </div>
            {recommendedClubs.length > initialShowCardsLimit && (
                <button>
                  <p
                      className="mt-3 text-white hover:text-sky-100 text-sm font-medium"
                      onClick={toggleRecommendedClubs}
                  >
                    {showRecommendedCardsLimit === initialShowCardsLimit
                        ? "Show All"
                        : "Show Less"}
                  </p>
                </button>
            )}
          </div>
        </div>
      </div>
      );
      };

      export default DiscoverSidebar;