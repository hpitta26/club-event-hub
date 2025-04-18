import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  useTheme, 
  ThemeProvider, 
  createTheme,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import ReactApexChart from 'react-apexcharts';

// Create a light theme that matches your current design
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
});

// Function to generate simulated candlestick data with more realistic trends
const generateCandlestickData = (metric, periods = 12) => {
  const data = [];
  let baseValue = metric === 'membership' ? 90 : 
                 metric === 'eventAttendance' ? 55 : 
                 metric === 'weeklyAttendance' ? 40 : 
                 metric === 'totalParticipation' ? 100 : 80;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < periods; i++) {
    const volatility = Math.random() * 0.2 + 0.05;
    const change = baseValue * volatility * (Math.random() > 0.5 ? 1 : -1);

    const open = baseValue;
    const close = baseValue + change;
    const high = Math.max(open, close) + Math.random() * 10;
    const low = Math.min(open, close) - Math.random() * 10;

    data.push({
      x: months[i],
      y: [
        Math.round(open), 
        Math.round(high), 
        Math.round(low), 
        Math.round(close)
      ]
    });

    baseValue = close; // For the next period
  }

  return data;
};

// Function to generate event data with attendee changes
const generateEventData = (count = 15) => {
  const events = [];
  const currentDate = new Date();

  // Event types
  const eventTypes = ['General Meeting', 'Workshop', 'Social', 'Competition', 'Info Session'];

  for (let i = 0; i < count; i++) {
    // Generate a date within the past 6 months
    const eventDate = new Date(currentDate);
    eventDate.setDate(currentDate.getDate() - Math.floor(Math.random() * 180));

    // Format the date
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });

    // Generate random event type
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

    // Generate participant change (-10 to +15)
    const participantChange = Math.floor(Math.random() * 26) - 10;

    events.push({
      date: formattedDate,
      type: eventType,
      participantChange: participantChange
    });
  }

  // Sort by date (most recent first)
  events.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return events;
};

// Chart component for each metric
const MetricChart = ({ title, data, yAxisMin, yAxisMax, description }) => {
  const theme = useTheme();

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
      background: 'transparent',
      foreColor: theme.palette.text.primary,
      toolbar: {
        show: false
      }
    },
    title: {
      text: title,
      align: 'left',
      style: {
        fontSize: '16px',
        color: theme.palette.text.primary
      }
    },
    subtitle: {
      text: description || '',
      align: 'left',
      style: {
        fontSize: '12px',
        color: theme.palette.text.secondary
      }
    },
    xaxis: {
      type: 'category',
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      min: yAxisMin,
      max: yAxisMax,
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 4
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#4CAF50',
          downward: '#F44336'
        },
        wick: {
          useFillColor: true
        }
      }
    },
    tooltip: {
      theme: 'light' // Changed from dark to light
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        height: '100%', 
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' // Added subtle shadow
      }}
    >
      <ReactApexChart 
        options={options} 
        series={[{ data: data }]} 
        type="candlestick" 
        height={350} 
      />
    </Paper>
  );
};

// Event Sidebar Component
const EventSidebar = ({ events }) => {
  const theme = useTheme();

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        height: '100%', 
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'auto',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          p: 2, 
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1
        }}
      >
        Recent Events
      </Typography>
      <List sx={{ p: 0 }}>
        {events.map((event, index) => (
          <React.Fragment key={index}>
            <ListItem 
              sx={{ 
                py: 1.5,
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    minWidth: '70px',
                    color: theme.palette.text.secondary 
                  }}
                >
                  {event.date}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    flex: 1,
                    px: 1
                  }}
                >
                  {event.type}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: event.participantChange >= 0 ? 
                      theme.palette.success.main : 
                      theme.palette.error.main
                  }}
                >
                  {event.participantChange >= 0 ? 
                    `+${event.participantChange}` : 
                    event.participantChange}
                </Typography>
              </Box>
            </ListItem>
            {index < events.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

function Analytics() {
   
  // Define metrics with their corresponding ranges
  const metrics = [
    {
      id: 'membership',
      title: 'Membership Total Counts',
      yAxisMin: 0,
      yAxisMax: 200
    },
    {
      id: 'eventAttendance',
      title: 'Average Event Attendance',
      yAxisMin: 0,
      yAxisMax: 200
    },
    {
      id: 'weeklyAttendance',
      title: 'Average Weekly Meeting Attendance',
      yAxisMin: 0,
      yAxisMax: 200
    },
    {
      id: 'totalParticipation',
      title: 'Public Event Engagement Counts',
      yAxisMin: 0,
      yAxisMax: 300
    }
  ];

  const [chartData, setChartData] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Generate simulated data for each metric
    const data = {};
    metrics.forEach(metric => {
      data[metric.id] = generateCandlestickData(metric.id);
    });
    setChartData(data);

    // Generate event data
    setEvents(generateEventData(15));
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <Box className="pt-28 pb-20" sx={{ minHeight: '100vh'}}>
        <Container maxWidth="xl">
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            gutterBottom
            sx={{ color: 'black' }}
          >
            Analytics Dashboard
          </Typography>
          <Typography 
            variant="subtitle1" 
            align="center" 
            sx={{ mb: 4, color: 'text.secondary' }}
          >
            Track membership and engagement metrics over time
          </Typography>

          <Grid container spacing={3}>
            {/* Sidebar */}
            <Grid item xs={12} md={3}>
              <EventSidebar events={events} />
            </Grid>

            {/* Charts */}
            <Grid item xs={12} md={9}>
              <Grid container spacing={3}>
                {metrics.map(metric => (
                  <Grid item xs={12} md={6} key={metric.id}>
                    {chartData[metric.id] && (
                      <MetricChart 
                        title={metric.title}
                        data={chartData[metric.id]} 
                        yAxisMin={metric.yAxisMin}
                        yAxisMax={metric.yAxisMax}
                        description={metric.description}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Analytics;