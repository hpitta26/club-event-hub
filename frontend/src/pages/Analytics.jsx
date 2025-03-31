import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  useTheme, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import ReactApexChart from 'react-apexcharts';

// Create a dark theme that matches your current design
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
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
      theme: 'dark'
    }
  };
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        height: '100%', 
        bgcolor: 'background.paper',
        borderRadius: 2
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

  useEffect(() => {
    // Generate simulated data for each metric
    const data = {};
    metrics.forEach(metric => {
      data[metric.id] = generateCandlestickData(metric.id);
    });
    setChartData(data);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 9 }}>
        <Container maxWidth="xl">
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            gutterBottom
            sx={{ color: 'text.primary' }}
          >
            Club Analytics Dashboard
          </Typography>
          <Typography 
            variant="subtitle1" 
            align="center" 
            sx={{ mb: 4, color: 'text.secondary' }}
          >
            Track membership and engagement metrics over time
          </Typography>
          
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
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Analytics;