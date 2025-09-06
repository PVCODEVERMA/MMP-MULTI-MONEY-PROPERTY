// src/components/superAdmin/dashboard/UserActivityChart.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  People,
  TrendingUp,
  TrendingDown,
  AccessTime,
  DeviceHub,
  LocationOn,
  Language,
  PhoneAndroid,
  Computer,
  Tablet,
  Refresh,
  Settings,
  Download,
  Fullscreen,
  Close,
  ExpandMore,
  Schedule,
  PersonAdd,
  ExitToApp,
  Timeline,
  Analytics,
  Visibility,
  CompareArrows
} from '@mui/icons-material';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  AreaChart,
  BarChart as RechartsBarChart,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// User Activity Metrics Card
const ActivityMetricsCard = ({ metrics, period }) => (
  <Card elevation={2} sx={{ mb: 2 }}>
    <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="primary.main">
              {metrics?.totalSessions?.toLocaleString() || '12,450'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Total Sessions ({period})
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="success.main">
              {metrics?.activeUsers?.toLocaleString() || '8,920'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Active Users
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="info.main">
              {metrics?.avgSessionDuration || '14.5'}m
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Avg Session Duration
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="warning.main">
              {metrics?.bounceRate || '32.1'}%
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Bounce Rate
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

// Real-time Activity Indicator
const RealTimeActivity = ({ realtimeData }) => (
  <Box display="flex" alignItems="center" gap={1} mb={2}>
    <Box
      sx={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: 'success.main',
        animation: 'pulse 2s infinite'
      }}
    />
    <Typography variant="body2" color="textSecondary">
      {realtimeData?.activeNow || 145} users active right now
    </Typography>
  </Box>
);

// Device Analytics Component
const DeviceAnalytics = ({ deviceData }) => (
  <Card elevation={2}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Device & Platform Analytics
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={deviceData?.devices || [
                  { name: 'Desktop', value: 45, color: '#0088FE' },
                  { name: 'Mobile', value: 38, color: '#00C49F' },
                  { name: 'Tablet', value: 17, color: '#FFBB28' }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {(deviceData?.devices || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <List dense>
            {(deviceData?.browsers || [
              { name: 'Chrome', percentage: 68.5, icon: <Language /> },
              { name: 'Safari', percentage: 18.2, icon: <Language /> },
              { name: 'Firefox', percentage: 8.1, icon: <Language /> },
              { name: 'Edge', percentage: 5.2, icon: <Language /> }
            ]).map((browser) => (
              <ListItem key={browser.name}>
                <ListItemIcon>{browser.icon}</ListItemIcon>
                <ListItemText
                  primary={browser.name}
                  secondary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <LinearProgress
                        variant="determinate"
                        value={browser.percentage}
                        sx={{ width: 60, height: 4 }}
                      />
                      <Typography variant="caption">
                        {browser.percentage}%
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

// Peak Hours Chart
const PeakHoursChart = ({ hourlyData }) => (
  <Card elevation={2}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Peak Activity Hours (24h)
      </Typography>
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={hourlyData || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="hour" 
            tickFormatter={(hour) => `${hour}:00`}
          />
          <YAxis />
          <RechartsTooltip 
            formatter={(value) => [`${value} users`, 'Active Users']}
            labelFormatter={(hour) => `${hour}:00`}
          />
          <Bar 
            dataKey="users" 
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      
      <Box mt={2}>
        <Typography variant="body2" color="textSecondary">
          Peak activity: {hourlyData?.find(h => h.users === Math.max(...(hourlyData || []).map(h => h.users)))?.hour || 14}:00 - 
          {((hourlyData?.find(h => h.users === Math.max(...(hourlyData || []).map(h => h.users)))?.hour || 14) + 1)}:00
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

// Geographic Distribution
const GeographicDistribution = ({ geoData }) => (
  <Card elevation={2}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        User Distribution by Location
      </Typography>
      
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Country/Region</TableCell>
              <TableCell align="right">Users</TableCell>
              <TableCell align="right">Sessions</TableCell>
              <TableCell align="right">Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(geoData || [
              { country: 'India', users: 5420, sessions: 8930, percentage: 68.5 },
              { country: 'United States', users: 1250, sessions: 2100, percentage: 15.8 },
              { country: 'United Kingdom', users: 680, sessions: 1120, percentage: 8.6 },
              { country: 'Australia', users: 340, sessions: 580, percentage: 4.3 },
              { country: 'Canada', users: 225, sessions: 380, percentage: 2.8 }
            ]).map((location, index) => (
              <TableRow key={location.country} hover>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOn fontSize="small" color="primary" />
                    {location.country}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {location.users.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {location.sessions.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                    <LinearProgress
                      variant="determinate"
                      value={location.percentage}
                      sx={{ width: 40, height: 4 }}
                    />
                    <Typography variant="body2">
                      {location.percentage}%
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
);

// Session Flow Analysis
const SessionFlowAnalysis = ({ flowData }) => (
  <Card elevation={2}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Session Flow Analysis
      </Typography>
      
      <Box>
        {(flowData || [
          { stage: 'Landing', users: 10000, dropoff: 0 },
          { stage: 'Registration', users: 7500, dropoff: 25 },
          { stage: 'Profile Setup', users: 6200, dropoff: 17.3 },
          { stage: 'First Action', users: 5500, dropoff: 11.3 },
          { stage: 'Active User', users: 4800, dropoff: 12.7 }
        ]).map((stage, index, array) => (
          <Box key={stage.stage} mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" fontWeight="medium">
                {stage.stage}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {stage.users.toLocaleString()} users ({((stage.users / array[0].users) * 100).toFixed(1)}%)
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(stage.users / array[0].users) * 100}
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: COLORS[index % COLORS.length]
                }
              }}
            />
            {index < array.length - 1 && stage.dropoff > 0 && (
              <Box textAlign="center" my={1}>
                <Typography variant="caption" color="error.main">
                  ↓ {stage.dropoff}% drop-off
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

// User Engagement Trends
const EngagementTrends = ({ engagementData }) => (
  <Card elevation={2}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        User Engagement Trends
      </Typography>
      
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={engagementData || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <RechartsTooltip 
            formatter={(value, name) => [
              name === 'sessions' ? `${value.toLocaleString()} sessions` :
              name === 'newUsers' ? `${value.toLocaleString()} new users` :
              name === 'pageViews' ? `${value.toLocaleString()} page views` :
              `${value}min`,
              name === 'sessions' ? 'Sessions' :
              name === 'newUsers' ? 'New Users' :
              name === 'pageViews' ? 'Page Views' :
              'Avg Session Duration'
            ]}
          />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="sessions"
            fill="#8884d8"
            fillOpacity={0.6}
            stroke="#8884d8"
            name="sessions"
          />
          <Bar yAxisId="right" dataKey="newUsers" fill="#82ca9d" name="newUsers" />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="avgSessionDuration" 
            stroke="#ff7300" 
            name="avgSessionDuration"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

// Main UserActivityChart Component
const UserActivityChart = ({ 
  data = null,
  title = "User Activity Analytics",
  period = "Last 30 Days",
  loading = false,
  showRealtime = true,
  onRefresh 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  
  // Mock data for demonstration
  const mockData = {
    metrics: {
      totalSessions: 12450,
      activeUsers: 8920,
      avgSessionDuration: 14.5,
      bounceRate: 32.1
    },
    realtimeData: {
      activeNow: 145
    },
    hourlyActivity: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      users: Math.floor(Math.random() * 500) + 50
    })),
    engagementData: [
      { date: 'Mon', sessions: 2400, newUsers: 400, pageViews: 8500, avgSessionDuration: 12.5 },
      { date: 'Tue', sessions: 2210, newUsers: 380, pageViews: 7800, avgSessionDuration: 13.2 },
      { date: 'Wed', sessions: 2780, newUsers: 450, pageViews: 9200, avgSessionDuration: 11.8 },
      { date: 'Thu', sessions: 3150, newUsers: 520, pageViews: 10100, avgSessionDuration: 15.1 },
      { date: 'Fri', sessions: 3890, newUsers: 680, pageViews: 12500, avgSessionDuration: 16.3 },
      { date: 'Sat', sessions: 2890, newUsers: 420, pageViews: 8900, avgSessionDuration: 13.8 },
      { date: 'Sun', sessions: 2150, newUsers: 320, pageViews: 7200, avgSessionDuration: 12.1 }
    ],
    deviceData: {
      devices: [
        { name: 'Desktop', value: 45 },
        { name: 'Mobile', value: 38 },
        { name: 'Tablet', value: 17 }
      ],
      browsers: [
        { name: 'Chrome', percentage: 68.5, icon: <Language /> },
        { name: 'Safari', percentage: 18.2, icon: <Language /> },
        { name: 'Firefox', percentage: 8.1, icon: <Language /> },
        { name: 'Edge', percentage: 5.2, icon: <Language /> }
      ]
    }
  };

  const activityData = data || mockData;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <EngagementTrends engagementData={activityData.engagementData} />
              </Grid>
              <Grid item xs={12} md={6}>
                <PeakHoursChart hourlyData={activityData.hourlyActivity} />
              </Grid>
              <Grid item xs={12} md={6}>
                <DeviceAnalytics deviceData={activityData.deviceData} />
              </Grid>
            </Grid>
          </Box>
        );
      
      case 'geographic':
        return (
          <Box>
            <GeographicDistribution />
          </Box>
        );
      
      case 'behavior':
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <SessionFlowAnalysis />
              </Grid>
              <Grid item xs={12} md={6}>
                <DeviceAnalytics deviceData={activityData.deviceData} />
              </Grid>
            </Grid>
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <Card elevation={3}>
        <CardContent>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <People />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {period}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              {onRefresh && (
                <Tooltip title="Refresh Data">
                  <IconButton onClick={onRefresh} disabled={loading}>
                    <Refresh />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Settings">
                <IconButton onClick={() => setSettingsOpen(true)}>
                  <Settings />
                </IconButton>
              </Tooltip>

              <Tooltip title="Export">
                <IconButton>
                  <Download />
                </IconButton>
              </Tooltip>

              <Tooltip title="Fullscreen">
                <IconButton onClick={() => setFullscreenOpen(true)}>
                  <Fullscreen />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {loading && <LinearProgress sx={{ mb: 2 }} />}

          {/* Real-time Activity */}
          {showRealtime && (
            <RealTimeActivity realtimeData={activityData.realtimeData} />
          )}

          {/* Metrics */}
          <ActivityMetricsCard 
            metrics={activityData.metrics} 
            period={period} 
          />

          {/* Tab Navigation */}
          <Box mb={3}>
            <Box display="flex" gap={1} mb={2}>
              {[
                { key: 'overview', label: 'Overview', icon: <Analytics /> },
                { key: 'geographic', label: 'Geographic', icon: <LocationOn /> },
                { key: 'behavior', label: 'User Behavior', icon: <Timeline /> }
              ].map((tab) => (
                <Button
                  key={tab.key}
                  variant={activeTab === tab.key ? 'contained' : 'outlined'}
                  startIcon={tab.icon}
                  onClick={() => setActiveTab(tab.key)}
                  size="small"
                >
                  {tab.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Tab Content */}
          {renderTabContent()}
        </CardContent>
      </Card>

      {/* Fullscreen Dialog */}
      <Dialog
        open={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        maxWidth="xl"
        fullWidth
        PaperProps={{ sx: { height: '90vh' } }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">{title} - Fullscreen View</Typography>
            <IconButton onClick={() => setFullscreenOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ height: '100%' }}>
            {/* Real-time Activity */}
            {showRealtime && (
              <RealTimeActivity realtimeData={activityData.realtimeData} />
            )}

            {/* Metrics */}
            <ActivityMetricsCard 
              metrics={activityData.metrics} 
              period={period} 
            />

            {/* Main Chart */}
            <EngagementTrends engagementData={activityData.engagementData} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserActivityChart;
