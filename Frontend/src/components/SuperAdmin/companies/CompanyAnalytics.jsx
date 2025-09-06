// src/components/superAdmin/companies/CompanyAnalytics.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
  Button,
  MenuItem,
  TextField,
  IconButton,
  Tooltip,
  Avatar,
  Chip,
  LinearProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  Assignment,
  AttachMoney,
  Download,
  Refresh,
  FilterList,
  DateRange,
  Business,
  Phone,
  Email,
  LocationOn,
  Star,
  CheckCircle,
  Cancel,
  Timeline,
  BarChart,
  PieChart,
  ShowChart,
  Compare,
  Insights,
  Map,
  Schedule
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ComposedChart,
  Legend,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useCompanyApi } from '../../../hooks/useCompanyApi';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Metric Card Component
const MetricCard = ({ title, value, change, changeType, icon, color = 'primary', subtext }) => (
  <Card elevation={3} sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="div" fontWeight="bold">
            {value}
          </Typography>
          {subtext && (
            <Typography variant="body2" color="textSecondary">
              {subtext}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}.light`,
            borderRadius: '50%',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
      </Box>
      {change && (
        <Box display="flex" alignItems="center">
          {changeType === 'positive' ? (
            <TrendingUp color="success" fontSize="small" />
          ) : (
            <TrendingDown color="error" fontSize="small" />
          )}
          <Typography
            variant="body2"
            color={changeType === 'positive' ? 'success.main' : 'error.main'}
            ml={0.5}
          >
            {change} from last period
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

// Broker Performance Table
const BrokerPerformanceTable = ({ brokers, loading }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Broker Performance Analytics
      </Typography>
      
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Broker</TableCell>
                <TableCell align="right">Leads</TableCell>
                <TableCell align="right">Conversion</TableCell>
                <TableCell align="right">Revenue</TableCell>
                <TableCell align="right">Performance</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brokers.map((broker) => (
                <TableRow key={broker._id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {broker.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {broker.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {broker.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="bold">
                      {broker.totalLeads || 0}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                      <LinearProgress
                        variant="determinate"
                        value={broker.conversionRate || 0}
                        sx={{ width: 40, height: 4 }}
                        color={broker.conversionRate > 15 ? 'success' : broker.conversionRate > 8 ? 'warning' : 'error'}
                      />
                      <Typography variant="body2">
                        {broker.conversionRate?.toFixed(1) || 0}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="bold">
                      ₹{((broker.totalRevenue || 0) / 100000).toFixed(1)}L
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={broker.performanceGrade || 'B'}
                      color={
                        broker.performanceGrade === 'A+' || broker.performanceGrade === 'A' ? 'success' :
                        broker.performanceGrade === 'B' ? 'warning' : 'error'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={broker.isActive ? 'Active' : 'Inactive'}
                      color={broker.isActive ? 'success' : 'error'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </CardContent>
  </Card>
);

// Revenue Chart Component
const RevenueChart = ({ data, period }) => (
  <Card>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">
          Revenue Trend ({period})
        </Typography>
        <Chip label="₹ in Lakhs" size="small" variant="outlined" />
      </Box>
      
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <RechartsTooltip 
            formatter={(value, name) => [
              `₹${(value/100000).toFixed(1)}L`, 
              name === 'revenue' ? 'Revenue' : name === 'target' ? 'Target' : 'Growth'
            ]}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            fill="#8884d8"
            fillOpacity={0.6}
            stroke="#8884d8"
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#ff7300"
            strokeDasharray="5 5"
            name="Target"
          />
          <Bar
            dataKey="growth"
            fill="#82ca9d"
            name="Growth %"
            yAxisId="right"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

// Lead Source Distribution
const LeadSourceChart = ({ data }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Lead Source Distribution
      </Typography>
      
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <RechartsTooltip />
        </RechartsPieChart>
      </ResponsiveContainer>
      
      <Box mt={2}>
        <Grid container spacing={1}>
          {data.map((item, index) => (
            <Grid item xs={6} key={item.name}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: COLORS[index % COLORS.length],
                    borderRadius: '50%'
                  }}
                />
                <Typography variant="body2">
                  {item.name}: {item.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </CardContent>
  </Card>
);

// Conversion Funnel
const ConversionFunnel = ({ data }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Lead Conversion Funnel
      </Typography>
      
      <Box>
        {data.map((stage, index) => (
          <Box key={stage.name} mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" fontWeight="medium">
                {stage.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {stage.count} ({stage.percentage}%)
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={stage.percentage}
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: COLORS[index % COLORS.length]
                }
              }}
            />
            {index < data.length - 1 && (
              <Box textAlign="center" my={1}>
                <Typography variant="caption" color="textSecondary">
                  ↓ {((data[index + 1].count / stage.count) * 100).toFixed(1)}% conversion
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

// Geographic Analytics
const GeographicAnalytics = ({ data }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Geographic Performance
      </Typography>
      
      <List>
        {data.map((location, index) => (
          <React.Fragment key={location.city}>
            <ListItem>
              <ListItemIcon>
                <LocationOn color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={location.city}
                secondary={`${location.brokers} brokers • ${location.leads} leads`}
              />
              <Box textAlign="right">
                <Typography variant="h6" fontWeight="bold">
                  ₹{(location.revenue / 100000).toFixed(1)}L
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {location.growth > 0 ? '+' : ''}{location.growth}%
                </Typography>
              </Box>
            </ListItem>
            {index < data.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </CardContent>
  </Card>
);

// Main Component
const CompanyAnalytics = ({ companyId, companyName }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [timeframe, setTimeframe] = useState('30d');
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(30, 'day'),
    endDate: dayjs()
  });
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({});
  const [compareMode, setCompareMode] = useState(false);
  const [exportDialog, setExportDialog] = useState(false);

  const {
    getCompanyAnalytics,
    getCompanyBrokers,
    getCompanyRevenue,
    getLeadAnalytics,
    exportCompanyData
  } = useCompanyApi();

  useEffect(() => {
    if (companyId) {
      fetchAnalyticsData();
    }
  }, [companyId, timeframe, dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const [analytics, brokers, revenue, leadData] = await Promise.all([
        getCompanyAnalytics(companyId, { timeframe }),
        getCompanyBrokers(companyId),
        getCompanyRevenue(companyId, { period: timeframe }),
        getLeadAnalytics(companyId, { timeframe })
      ]);

      setAnalyticsData({
        overview: analytics.data,
        brokers: brokers.data,
        revenue: revenue.data,
        leads: leadData.data
      });
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      const exportData = await exportCompanyData(companyId, {
        format,
        timeframe,
        sections: ['overview', 'brokers', 'revenue', 'leads']
      });
      
      // Create download link
      const blob = new Blob([exportData], { type: format === 'csv' ? 'text/csv' : 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${companyName}_analytics_${timeframe}.${format}`;
      link.click();
      
      setExportDialog(false);
    } catch (error) {
      console.error('Failed to export data:', error);
    }
  };

  // Mock data for demonstration
  const mockOverviewData = {
    totalRevenue: 2500000, // ₹25L
    totalLeads: 1250,
    totalBrokers: 15,
    conversionRate: 18.5,
    avgDealValue: 125000,
    customerSatisfaction: 4.3
  };

  const mockRevenueData = [
    { period: 'Jan', revenue: 1800000, target: 2000000, growth: 12 },
    { period: 'Feb', revenue: 2200000, target: 2100000, growth: 18 },
    { period: 'Mar', revenue: 2500000, target: 2200000, growth: 25 },
    { period: 'Apr', revenue: 2800000, target: 2300000, growth: 30 },
    { period: 'May', revenue: 2600000, target: 2400000, growth: 15 },
    { period: 'Jun', revenue: 3200000, target: 2500000, growth: 35 }
  ];

  const mockLeadSourceData = [
    { name: 'Website', value: 450 },
    { name: 'Facebook Ads', value: 320 },
    { name: 'Google Ads', value: 280 },
    { name: 'Referrals', value: 150 },
    { name: 'Walk-in', value: 50 }
  ];

  const mockFunnelData = [
    { name: 'Total Leads', count: 1250, percentage: 100 },
    { name: 'Contacted', count: 1000, percentage: 80 },
    { name: 'Qualified', count: 750, percentage: 60 },
    { name: 'Proposal Sent', count: 400, percentage: 32 },
    { name: 'Converted', count: 230, percentage: 18.4 }
  ];

  const mockBrokers = [
    {
      _id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      totalLeads: 85,
      conversionRate: 22.5,
      totalRevenue: 450000,
      performanceGrade: 'A',
      isActive: true
    },
    {
      _id: '2',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      totalLeads: 72,
      conversionRate: 19.8,
      totalRevenue: 380000,
      performanceGrade: 'A',
      isActive: true
    },
    {
      _id: '3',
      name: 'Amit Patel',
      email: 'amit@example.com',
      totalLeads: 68,
      conversionRate: 16.2,
      totalRevenue: 320000,
      performanceGrade: 'B',
      isActive: true
    }
  ];

  const mockGeoData = [
    { city: 'Mumbai', brokers: 8, leads: 580, revenue: 1200000, growth: 25 },
    { city: 'Pune', brokers: 4, leads: 320, revenue: 680000, growth: 18 },
    { city: 'Nashik', brokers: 3, leads: 350, revenue: 620000, growth: -5 }
  ];

  if (!companyId) {
    return (
      <Alert severity="info">
        Please select a company to view analytics.
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Company Analytics
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {companyName}
          </Typography>
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Period</InputLabel>
            <Select
              value={timeframe}
              label="Period"
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <MenuItem value="7d">7 Days</MenuItem>
              <MenuItem value="30d">30 Days</MenuItem>
              <MenuItem value="90d">90 Days</MenuItem>
              <MenuItem value="1y">1 Year</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="outlined"
            startIcon={<Compare />}
            onClick={() => setCompareMode(!compareMode)}
          >
            Compare
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => setExportDialog(true)}
          >
            Export
          </Button>
          
          <IconButton onClick={fetchAnalyticsData} disabled={loading}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} variant="fullWidth">
          <Tab label="Overview" icon={<Insights />} />
          <Tab label="Revenue Analytics" icon={<ShowChart />} />
          <Tab label="Broker Performance" icon={<People />} />
          <Tab label="Lead Analytics" icon={<Assignment />} />
          <Tab label="Geographic Analysis" icon={<Map />} />
        </Tabs>
      </Card>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box>
          {/* Overview Metrics */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={2}>
              <MetricCard
                title="Total Revenue"
                value={`₹${(mockOverviewData.totalRevenue / 100000).toFixed(1)}L`}
                change="+25.5%"
                changeType="positive"
                icon={<AttachMoney />}
                color="success"
                subtext="This month"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <MetricCard
                title="Total Leads"
                value={mockOverviewData.totalLeads.toLocaleString()}
                change="+18.2%"
                changeType="positive"
                icon={<Assignment />}
                color="primary"
                subtext="All time"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <MetricCard
                title="Active Brokers"
                value={mockOverviewData.totalBrokers}
                change="+2"
                changeType="positive"
                icon={<People />}
                color="info"
                subtext="Currently active"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <MetricCard
                title="Conversion Rate"
                value={`${mockOverviewData.conversionRate}%`}
                change="+3.2%"
                changeType="positive"
                icon={<TrendingUp />}
                color="warning"
                subtext="Lead to deal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <MetricCard
                title="Avg Deal Value"
                value={`₹${(mockOverviewData.avgDealValue / 100000).toFixed(1)}L`}
                change="+8.5%"
                changeType="positive"
                icon={<Timeline />}
                color="secondary"
                subtext="Per transaction"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <MetricCard
                title="Satisfaction"
                value={`${mockOverviewData.customerSatisfaction}/5`}
                change="+0.2"
                changeType="positive"
                icon={<Star />}
                color="error"
                subtext="Customer rating"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <RevenueChart data={mockRevenueData} period={timeframe} />
            </Grid>
            <Grid item xs={12} md={4}>
              <LeadSourceChart data={mockLeadSourceData} />
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <RevenueChart data={mockRevenueData} period={timeframe} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Revenue Breakdown
                  </Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsBarChart data={mockRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Revenue vs Target
                  </Typography>
                  <List>
                    {mockRevenueData.slice(-3).map((item) => (
                      <ListItem key={item.period}>
                        <ListItemText
                          primary={item.period}
                          secondary={`Target: ₹${(item.target/100000).toFixed(1)}L`}
                        />
                        <Box textAlign="right">
                          <Typography variant="h6">
                            ₹{(item.revenue/100000).toFixed(1)}L
                          </Typography>
                          <Chip
                            label={`${((item.revenue/item.target - 1) * 100).toFixed(1)}%`}
                            color={item.revenue > item.target ? 'success' : 'error'}
                            size="small"
                          />
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <BrokerPerformanceTable brokers={mockBrokers} loading={loading} />
        </Box>
      )}

      {activeTab === 3 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <LeadSourceChart data={mockLeadSourceData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ConversionFunnel data={mockFunnelData} />
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 4 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    City-wise Performance
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={mockGeoData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="city" />
                      <YAxis />
                      <RechartsTooltip 
                        formatter={(value, name) => [
                          name === 'revenue' ? `₹${(value/100000).toFixed(1)}L` : value,
                          name.charAt(0).toUpperCase() + name.slice(1)
                        ]}
                      />
                      <Bar dataKey="revenue" fill="#8884d8" name="revenue" />
                      <Bar dataKey="leads" fill="#82ca9d" name="leads" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <GeographicAnalytics data={mockGeoData} />
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Export Dialog */}
      <Dialog open={exportDialog} onClose={() => setExportDialog(false)}>
        <DialogTitle>Export Analytics Data</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Choose the format to export the analytics data for {companyName}
          </Typography>
          <Box mt={2}>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => handleExport('csv')}
              sx={{ mr: 2, mb: 2 }}
            >
              Export as CSV
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => handleExport('xlsx')}
              sx={{ mr: 2, mb: 2 }}
            >
              Export as Excel
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => handleExport('pdf')}
              sx={{ mb: 2 }}
            >
              Export as PDF
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyAnalytics;
