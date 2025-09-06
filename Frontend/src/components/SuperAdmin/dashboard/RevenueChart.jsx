// src/components/superAdmin/dashboard/RevenueChart.jsx
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
  Divider
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Download,
  Settings,
  FilterList,
  Refresh,
  CompareArrows,
  Timeline,
  BarChart,
  ShowChart,
  PieChart,
  Fullscreen,
  Close,
  AttachMoney,
  CalendarToday,
  Analytics
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ReferenceLine
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Chart Type Configuration
const chartTypes = {
  composed: { icon: <Timeline />, label: 'Combined Chart' },
  area: { icon: <ShowChart />, label: 'Area Chart' },
  bar: { icon: <BarChart />, label: 'Bar Chart' },
  line: { icon: <Analytics />, label: 'Line Chart' }
};

// Revenue Metrics Card
const RevenueMetricsCard = ({ metrics, period }) => (
  <Card elevation={2} sx={{ mb: 2 }}>
    <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="primary.main">
              ₹{(metrics?.totalRevenue / 10000000 || 0).toFixed(1)}Cr
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Total Revenue ({period})
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box textAlign="center">
            <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                +{metrics?.growth || 0}%
              </Typography>
              <TrendingUp color="success" />
            </Box>
            <Typography variant="caption" color="textSecondary">
              Growth Rate
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="info.main">
              ₹{(metrics?.avgMonthly / 10000000 || 0).toFixed(1)}Cr
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Monthly Average
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="warning.main">
              {metrics?.targetAchievement || 0}%
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Target Achievement
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Card elevation={4} sx={{ p: 2, minWidth: 200 }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          {label}
        </Typography>
        {payload.map((entry, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1} mb={0.5}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: entry.color,
                borderRadius: '50%'
              }}
            />
            <Typography variant="body2">
              {entry.name}: ₹{(entry.value / 100000).toFixed(1)}L
            </Typography>
          </Box>
        ))}
      </Card>
    );
  }
  return null;
};

// Chart Settings Dialog
const ChartSettingsDialog = ({ open, onClose, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chart Settings</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Chart Type</InputLabel>
            <Select
              value={localSettings.chartType}
              label="Chart Type"
              onChange={(e) => setLocalSettings(prev => ({ ...prev, chartType: e.target.value }))}
            >
              {Object.entries(chartTypes).map(([key, type]) => (
                <MenuItem key={key} value={key}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {type.icon}
                    {type.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={localSettings.showTarget}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, showTarget: e.target.checked }))}
              />
            }
            label="Show Target Line"
            sx={{ mb: 2, display: 'block' }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={localSettings.showGrid}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, showGrid: e.target.checked }))}
              />
            }
            label="Show Grid Lines"
            sx={{ mb: 2, display: 'block' }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={localSettings.showLegend}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, showLegend: e.target.checked }))}
              />
            }
            label="Show Legend"
            sx={{ mb: 2, display: 'block' }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={localSettings.animateOnLoad}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, animateOnLoad: e.target.checked }))}
              />
            }
            label="Animate on Load"
            sx={{ display: 'block' }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save Settings</Button>
      </DialogActions>
    </Dialog>
  );
};

// Export Dialog
const ExportDialog = ({ open, onClose, onExport, chartTitle }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Export Revenue Chart</DialogTitle>
    <DialogContent>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Choose export format for "{chartTitle}"
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={() => onExport('png')}
          fullWidth
        >
          Export as PNG Image
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={() => onExport('svg')}
          fullWidth
        >
          Export as SVG Vector
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={() => onExport('csv')}
          fullWidth
        >
          Export Data as CSV
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={() => onExport('pdf')}
          fullWidth
        >
          Export as PDF Report
        </Button>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

// Main RevenueChart Component
const RevenueChart = ({ 
  data = [], 
  title = "Revenue Analytics", 
  period = "Last 6 Months",
  loading = false,
  height = 400,
  showMetrics = true,
  allowExport = true,
  allowSettings = true,
  onRefresh 
}) => {
  const [chartSettings, setChartSettings] = useState({
    chartType: 'composed',
    showTarget: true,
    showGrid: true,
    showLegend: true,
    animateOnLoad: true
  });
  
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Default/Mock data if none provided
  const defaultData = [
    {
      period: 'Jan 2025',
      revenue: 18000000,
      target: 20000000,
      growth: 5200000,
      companies: 35,
      packages: 12000000,
      wallet: 6000000
    },
    {
      period: 'Feb 2025',
      revenue: 22000000,
      target: 21000000,
      growth: 6800000,
      companies: 37,
      packages: 14500000,
      wallet: 7500000
    },
    {
      period: 'Mar 2025',
      revenue: 25000000,
      target: 22000000,
      growth: 7500000,
      companies: 40,
      packages: 16000000,
      wallet: 9000000
    },
    {
      period: 'Apr 2025',
      revenue: 28000000,
      target: 23000000,
      growth: 8200000,
      companies: 42,
      packages: 18500000,
      wallet: 9500000
    },
    {
      period: 'May 2025',
      revenue: 26000000,
      target: 24000000,
      growth: 7800000,
      companies: 43,
      packages: 17000000,
      wallet: 9000000
    },
    {
      period: 'Jun 2025',
      revenue: 32000000,
      target: 25000000,
      growth: 9500000,
      companies: 45,
      packages: 21000000,
      wallet: 11000000
    }
  ];

  const chartData = data.length > 0 ? data : defaultData;

  // Calculate metrics
  const metrics = {
    totalRevenue: chartData.reduce((sum, item) => sum + (item.revenue || 0), 0),
    growth: chartData.length > 1 ? 
      (((chartData[chartData.length - 1]?.revenue || 0) / (chartData[0]?.revenue || 1) - 1) * 100).toFixed(1) : 0,
    avgMonthly: chartData.reduce((sum, item) => sum + (item.revenue || 0), 0) / chartData.length,
    targetAchievement: chartData.length > 0 ?
      ((chartData.reduce((sum, item) => sum + (item.revenue || 0), 0) / 
        chartData.reduce((sum, item) => sum + (item.target || 1), 0)) * 100).toFixed(1) : 0
  };

  const handleExport = (format) => {
    // Implementation would depend on your export requirements
    console.log(`Exporting chart as ${format}`);
    setExportOpen(false);
    
    // Mock export functionality
    switch (format) {
      case 'csv':
        const csvContent = "data:text/csv;charset=utf-8," + 
          "Period,Revenue,Target,Growth\n" +
          chartData.map(item => 
            `${item.period},${item.revenue},${item.target},${item.growth}`
          ).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "revenue_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case 'png':
        // Would use html2canvas or similar library
        alert('PNG export functionality would be implemented with html2canvas');
        break;
      case 'svg':
        alert('SVG export functionality would be implemented');
        break;
      case 'pdf':
        alert('PDF export functionality would be implemented with jsPDF');
        break;
    }
  };

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartSettings.chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {chartSettings.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="period" />
            <YAxis tickFormatter={(value) => `₹${(value/100000).toFixed(0)}L`} />
            <RechartsTooltip content={<CustomTooltip />} />
            {chartSettings.showLegend && <Legend />}
            <Area
              type="monotone"
              dataKey="revenue"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
              name="Revenue"
            />
            {chartSettings.showTarget && (
              <Line
                type="monotone"
                dataKey="target"
                stroke="#ff7300"
                strokeDasharray="5 5"
                name="Target"
              />
            )}
          </AreaChart>
        );

      case 'bar':
        return (
          <RechartsBarChart {...commonProps}>
            {chartSettings.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="period" />
            <YAxis tickFormatter={(value) => `₹${(value/100000).toFixed(0)}L`} />
            <RechartsTooltip content={<CustomTooltip />} />
            {chartSettings.showLegend && <Legend />}
            <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
            <Bar dataKey="target" fill="#82ca9d" name="Target" />
          </RechartsBarChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
            {chartSettings.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="period" />
            <YAxis tickFormatter={(value) => `₹${(value/100000).toFixed(0)}L`} />
            <RechartsTooltip content={<CustomTooltip />} />
            {chartSettings.showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={3}
              name="Revenue"
              dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
            />
            {chartSettings.showTarget && (
              <Line
                type="monotone"
                dataKey="target"
                stroke="#ff7300"
                strokeDasharray="5 5"
                strokeWidth={2}
                name="Target"
              />
            )}
          </LineChart>
        );

      default: // composed
        return (
          <ComposedChart {...commonProps}>
            {chartSettings.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="period" />
            <YAxis yAxisId="left" tickFormatter={(value) => `₹${(value/100000).toFixed(0)}L`} />
            <YAxis yAxisId="right" orientation="right" />
            <RechartsTooltip content={<CustomTooltip />} />
            {chartSettings.showLegend && <Legend />}
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              fill="#8884d8"
              fillOpacity={0.6}
              stroke="#8884d8"
              name="Revenue"
            />
            <Bar yAxisId="right" dataKey="companies" fill="#82ca9d" name="Companies" />
            {chartSettings.showTarget && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="target"
                stroke="#ff7300"
                strokeDasharray="5 5"
                strokeWidth={2}
                name="Target"
              />
            )}
          </ComposedChart>
        );
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
                <AttachMoney />
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
              <Tooltip title="Chart Type">
                <Chip
                  icon={chartTypes[chartSettings.chartType].icon}
                  label={chartTypes[chartSettings.chartType].label}
                  size="small"
                  variant="outlined"
                />
              </Tooltip>

              {onRefresh && (
                <Tooltip title="Refresh Data">
                  <IconButton onClick={onRefresh} disabled={loading}>
                    <Refresh />
                  </IconButton>
                </Tooltip>
              )}

              {allowSettings && (
                <Tooltip title="Chart Settings">
                  <IconButton onClick={() => setSettingsOpen(true)}>
                    <Settings />
                  </IconButton>
                </Tooltip>
              )}

              {allowExport && (
                <Tooltip title="Export Chart">
                  <IconButton onClick={() => setExportOpen(true)}>
                    <Download />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Fullscreen">
                <IconButton onClick={() => setFullscreenOpen(true)}>
                  <Fullscreen />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {loading && <LinearProgress sx={{ mb: 2 }} />}

          {/* Metrics */}
          {showMetrics && (
            <RevenueMetricsCard metrics={metrics} period={period} />
          )}

          {/* Chart */}
          <Box sx={{ width: '100%', height: height }}>
            <ResponsiveContainer>
              {renderChart()}
            </ResponsiveContainer>
          </Box>

          {/* Footer */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Typography variant="caption" color="textSecondary">
              Data includes revenue from packages, wallet recharges, and featured listings
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Last updated: {new Date().toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Settings Dialog */}
      <ChartSettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={chartSettings}
        onSettingsChange={setChartSettings}
      />

      {/* Export Dialog */}
      <ExportDialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        onExport={handleExport}
        chartTitle={title}
      />

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
          <Box sx={{ width: '100%', height: '70vh' }}>
            <ResponsiveContainer>
              {renderChart()}
            </ResponsiveContainer>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RevenueChart;
