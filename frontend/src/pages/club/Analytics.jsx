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

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#ffffff', // Changed to white
      paper: '#ffffff',
    },
    text: {
      primary: '#000000', // Title text black
      secondary: '#000000', // Subtitle text black
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

    baseValue = close;
  }

  return data;
};

const generateEventData = (count = 15) => {
  const events = [];
  const currentDate = new Date();
  const eventTypes = ['General Meeting', 'Workshop', 'Social', 'Competition', 'Info Session'];

  for (let i = 0; i < count; i++) {
    const eventDate = new Date(currentDate);
    eventDate.setDate(currentDate.getDate() - Math.floor(Math.random() * 180));
    const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const participantChange = Math.floor(Math.random() * 26) - 10;

    events.push({
      date: formattedDate,
      type: eventType,
      participantChange: participantChange
    });
  }

  events.sort((a, b) => new Date(b.date) - new Date(a.date));
  return events;
};

const MetricChart = ({ title, data, yAxisMin, yAxisMax, description }) => {
  const theme = useTheme();

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
      background: 'transparent',
      foreColor: theme.palette.text.primary,
      toolbar: { show: false }
    },
    title: {
      text: title,
      align: 'left',
      style: { fontSize: '16px', color: theme.palette.text.primary }
    },
    subtitle: {
      text: description || '',
      align: 'left',
      style: { fontSize: '12px', color: theme.palette.text.secondary }
    },
    xaxis: {
      type: 'category',
      labels: { style: { colors: theme.palette.text.secondary } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      min: yAxisMin,
      max: yAxisMax,
      labels: { style: { colors: theme.palette.text.secondary } }
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
        wick: { useFillColor: true }
      }
    },
    tooltip: { theme: 'light' }
  };

  return (
    <Paper 
      elevation={1}
      sx={{ 
        p: 2, 
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '2px solid #000000',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'scale(1.015)'
        }
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

const EventSidebar = ({ events }) => {
  const theme = useTheme();

  return (
    <Paper 
      elevation={1}
      sx={{ 
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '2px solid #000000',
        overflow: 'auto',
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
                <Typography variant="body2" sx={{ minWidth: '70px', color: theme.palette.text.secondary }}>
                  {event.date}
                </Typography>
                <Typography variant="body2" sx={{ flex: 1, px: 1 }}>
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
                  {event.participantChange >= 0 ? `+${event.participantChange}` : event.participantChange}
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
  const metrics = [
    { id: 'membership', title: 'Membership Total Counts', yAxisMin: 0, yAxisMax: 200 },
    { id: 'eventAttendance', title: 'Average Event Attendance', yAxisMin: 0, yAxisMax: 200 },
    { id: 'weeklyAttendance', title: 'Average Weekly Meeting Attendance', yAxisMin: 0, yAxisMax: 200 },
    { id: 'totalParticipation', title: 'Public Event Engagement Counts', yAxisMin: 0, yAxisMax: 300 }
  ];

  const [chartData, setChartData] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const data = {};
    metrics.forEach(metric => {
      data[metric.id] = generateCandlestickData(metric.id);
    });
    setChartData(data);
    setEvents(generateEventData(15));
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 12, pb: 10 }}>
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
            sx={{ mb: 4, color: 'text.primary' }}
          >
            Track membership and engagement metrics over time
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <EventSidebar events={events} />
            </Grid>
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
