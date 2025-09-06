// src/components/superAdmin/dashboard/SystemHealthCard.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Badge,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Security,
  CheckCircle,
  Warning,
  Error,
  Info,
  Refresh,
  Visibility,
  Storage,
  CloudQueue,
  NetworkCheck,
  Memory,
  Speed,
  Router,
  Payment,
  Email,
  Notifications,
  Api,
  Timeline,
  ExpandMore,
  Close,
  TrendingUp,
  TrendingDown,
  MonitorHeart
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#4caf50', '#ff9800', '#f44336', '#2196f3'];

// Service Status Component
const ServiceStatusItem = ({ service, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'online': case 'healthy': return 'success';
      case 'warning': case 'degraded': return 'warning';
      case 'offline': case 'critical': return 'error';
      default: return 'info';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'online': case 'healthy': return <CheckCircle />;
      case 'warning': case 'degraded': return <Warning />;
      case 'offline': case 'critical': return <Error />;
      default: return <Info />;
    }
  };

  return (
    <ListItem>
      <ListItemIcon>
        {service.icon || <Api color="primary" />}
      </ListItemIcon>
      <ListItemText
        primary={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" fontWeight="medium">
              {service.name}
            </Typography>
            <Chip
              size="small"
              label={service.status}
              color={getStatusColor(service.status)}
              icon={getStatusIcon(service.status)}
            />
          </Box>
        }
        secondary={
          <Box>
            <Typography variant="caption" color="textSecondary">
              Response: {service.responseTime}ms | Uptime: {service.uptime}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={service.performance || 0}
              color={getStatusColor(service.status)}
              sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
            />
          </Box>
        }
      />
      <ListItemSecondaryAction>
        <Tooltip title="View Details">
          <IconButton 
            size="small" 
            onClick={() => onViewDetails(service)}
          >
            <Visibility />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

// Performance Metrics Component
const PerformanceMetrics = ({ metrics }) => (
  <Box>
    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
      System Performance
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box textAlign="center">
          <Typography variant="h4" color="primary.main" fontWeight="bold">
            {metrics?.cpuUsage || 45}%
          </Typography>
          <Typography variant="caption" color="textSecondary">
            CPU Usage
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box textAlign="center">
          <Typography variant="h4" color="info.main" fontWeight="bold">
            {metrics?.memoryUsage || 62}%
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Memory Usage
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box textAlign="center">
          <Typography variant="h4" color="warning.main" fontWeight="bold">
            {metrics?.diskUsage || 38}%
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Disk Usage
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box textAlign="center">
          <Typography variant="h4" color="success.main" fontWeight="bold">
            {metrics?.networkLatency || 12}ms
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Network Latency
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

// Health Score Gauge
const HealthScoreGauge = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return '#4caf50';
    if (score >= 70) return '#ff9800';
    return '#f44336';
  };

  const data = [
    { name: 'Health', value: score, fill: getScoreColor(score) },
    { name: 'Remaining', value: 100 - score, fill: '#e0e0e0' }
  ];

  return (
    <Box position="relative" display="inline-block">
      <ResponsiveContainer width={120} height={120}>
        <PieChart>
          <Pie
            data={data}
            cx={60}
            cy={60}
            innerRadius={35}
            outerRadius={50}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{ transform: 'translate(-50%, -50%)' }}
        textAlign="center"
      >
        <Typography variant="h6" fontWeight="bold">
          {score}%
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Health
        </Typography>
      </Box>
    </Box>
  );
};

// Service Details Dialog
const ServiceDetailsDialog = ({ open, service, onClose }) => {
  const [metricHistory, setMetricHistory] = useState([]);

  useEffect(() => {
    if (open && service) {
      // Generate mock metric history
      const history = Array.from({ length: 24 }, (_, i) => ({
        time: `${23 - i}h`,
        responseTime: Math.floor(Math.random() * 500) + 100,
        uptime: Math.floor(Math.random() * 10) + 90,
        errors: Math.floor(Math.random() * 20)
      }));
      setMetricHistory(history);
    }
  }, [open, service]);

  if (!service) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            {service.icon}
            <Typography variant="h6">{service.name} Details</Typography>
          </Box>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3}>
          {/* Service Overview */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Current Status
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Status"
                      secondary={
                        <Chip
                          label={service.status}
                          color={service.status === 'Online' ? 'success' : 'error'}
                          size="small"
                        />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Response Time"
                      secondary={`${service.responseTime}ms`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Uptime"
                      secondary={`${service.uptime}%`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Performance"
                      secondary={`${service.performance}%`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Performance Chart */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  24H Performance History
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={metricHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="responseTime"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Response Time (ms)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Events */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Events
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Event</TableCell>
                        <TableCell>Severity</TableCell>
                        <TableCell>Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[
                        { time: '2 min ago', event: 'High Response Time', severity: 'Warning', details: 'Response time exceeded 400ms' },
                        { time: '15 min ago', event: 'Service Restart', severity: 'Info', details: 'Automatic service restart completed' },
                        { time: '1 hour ago', event: 'Performance Alert', severity: 'Warning', details: 'CPU usage above 80%' },
                      ].map((event, index) => (
                        <TableRow key={index}>
                          <TableCell>{event.time}</TableCell>
                          <TableCell>{event.event}</TableCell>
                          <TableCell>
                            <Chip
                              label={event.severity}
                              color={event.severity === 'Warning' ? 'warning' : 'info'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{event.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" startIcon={<Refresh />}>
          Restart Service
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Main SystemHealthCard Component
const SystemHealthCard = ({ healthData, loading, onRefresh }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Default/Mock data if none provided
  const defaultHealthData = {
    overallHealth: 98,
    alerts: 3,
    services: [
      {
        name: 'API Server',
        status: 'Online',
        performance: 95,
        responseTime: 120,
        uptime: 99.9,
        icon: <Api color="primary" />
      },
      {
        name: 'Database',
        status: 'Online',
        performance: 92,
        responseTime: 85,
        uptime: 99.8,
        icon: <Storage color="primary" />
      },
      {
        name: 'Payment Gateway',
        status: 'Warning',
        performance: 78,
        responseTime: 450,
        uptime: 97.5,
        icon: <Payment color="warning" />
      },
      {
        name: 'Email Service',
        status: 'Online',
        performance: 88,
        responseTime: 200,
        uptime: 99.2,
        icon: <Email color="primary" />
      },
      {
        name: 'WhatsApp API',
        status: 'Online',
        performance: 90,
        responseTime: 180,
        uptime: 98.8,
        icon: <Notifications color="primary" />
      },
      {
        name: 'File Storage',
        status: 'Online',
        performance: 85,
        responseTime: 250,
        uptime: 99.5,
        icon: <CloudQueue color="primary" />
      }
    ],
    performanceMetrics: {
      cpuUsage: 45,
      memoryUsage: 62,
      diskUsage: 38,
      networkLatency: 12
    }
  };

  const data = healthData || defaultHealthData;

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh && onRefresh) {
      const interval = setInterval(() => {
        onRefresh();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh, onRefresh]);

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setDetailsOpen(true);
  };

  const getOverallHealthColor = (health) => {
    if (health >= 95) return 'success';
    if (health >= 85) return 'warning';
    return 'error';
  };

  const criticalServices = data.services.filter(s => 
    s.status === 'Offline' || s.status === 'Critical'
  ).length;

  const warningServices = data.services.filter(s => 
    s.status === 'Warning' || s.status === 'Degraded'
  ).length;

  return (
    <>
      <Card 
        elevation={3} 
        sx={{ 
          height: '100%',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        <CardContent>
          {/* Header */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <MonitorHeart />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                System Health Monitor
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center" gap={1}>
              <Badge 
                badgeContent={criticalServices + warningServices} 
                color="error"
                invisible={criticalServices + warningServices === 0}
              >
                <Security color="primary" />
              </Badge>
              
              <Tooltip title={autoRefresh ? 'Disable Auto-refresh' : 'Enable Auto-refresh'}>
                <IconButton 
                  size="small" 
                  color={autoRefresh ? 'primary' : 'default'}
                  onClick={() => setAutoRefresh(!autoRefresh)}
                >
                  <Timeline />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Refresh Now">
                <IconButton 
                  size="small" 
                  onClick={onRefresh}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : <Refresh />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Overall Health Score */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Box>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                {data.overallHealth}%
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Overall System Health
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Chip
                  label={data.overallHealth >= 95 ? 'Excellent' : data.overallHealth >= 85 ? 'Good' : 'Needs Attention'}
                  color={getOverallHealthColor(data.overallHealth)}
                  size="small"
                />
                {data.overallHealth >= 90 ? (
                  <TrendingUp color="success" fontSize="small" />
                ) : (
                  <TrendingDown color="error" fontSize="small" />
                )}
              </Box>
            </Box>
            
            <HealthScoreGauge score={data.overallHealth} />
          </Box>

          {/* System Alerts */}
          {(criticalServices > 0 || warningServices > 0) && (
            <Alert 
              severity={criticalServices > 0 ? 'error' : 'warning'} 
              sx={{ mb: 3 }}
              action={
                <Button size="small" color="inherit">
                  View All
                </Button>
              }
            >
              {criticalServices > 0 
                ? `${criticalServices} critical service${criticalServices > 1 ? 's' : ''} need attention`
                : `${warningServices} service${warningServices > 1 ? 's' : ''} showing warnings`
              }
            </Alert>
          )}

          {/* Performance Metrics */}
          <Accordion defaultExpanded sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" fontWeight="medium">
                Performance Metrics
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PerformanceMetrics metrics={data.performanceMetrics} />
            </AccordionDetails>
          </Accordion>

          {/* Services Status */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" fontWeight="medium">
                Services Status ({data.services.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List dense>
                {data.services.map((service, index) => (
                  <React.Fragment key={service.name}>
                    <ServiceStatusItem
                      service={service}
                      onViewDetails={handleViewDetails}
                    />
                    {index < data.services.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Footer */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
            <Typography variant="caption" color="textSecondary">
              Last updated: {new Date().toLocaleTimeString()}
            </Typography>
            <Button 
              size="small" 
              variant="outlined" 
              startIcon={<Visibility />}
              onClick={() => window.open('/admin/system-health', '_blank')}
            >
              Full Dashboard
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Service Details Dialog */}
      <ServiceDetailsDialog
        open={detailsOpen}
        service={selectedService}
        onClose={() => setDetailsOpen(false)}
      />
    </>
  );
};

export default SystemHealthCard;
