// src/components/superAdmin/dashboard/AlertsPanel.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
  Collapse,
  Badge,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Divider,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  CheckCircle,
  Security,
  Payment,
  People,
  Business,
  Assignment,
  NotificationsActive,
  Close,
  MoreVert,
  Visibility,
  Delete,
  Archive,
  Refresh,
  FilterList,
  Settings,
  Schedule,
  Notifications,
  Priority,
  ExpandMore,
  PlayArrow,
  Pause,
  VolumeOff,
  VolumeUp,
  Email,
  Sms,
  WhatsApp,
  Phone,
  CloudOff,
  Storage,
  Api,
  NetworkCheck,
  Update,
  BugReport
} from '@mui/icons-material';

// Alert Priority Levels
const ALERT_PRIORITIES = {
  critical: { 
    level: 5, 
    color: 'error', 
    icon: <Error />, 
    label: 'Critical',
    bgColor: '#ffebee'
  },
  high: { 
    level: 4, 
    color: 'warning', 
    icon: <Warning />, 
    label: 'High',
    bgColor: '#fff3e0'
  },
  medium: { 
    level: 3, 
    color: 'info', 
    icon: <Info />, 
    label: 'Medium',
    bgColor: '#e3f2fd'
  },
  low: { 
    level: 2, 
    color: 'success', 
    icon: <CheckCircle />, 
    label: 'Low',
    bgColor: '#e8f5e8'
  }
};

// Alert Categories
const ALERT_CATEGORIES = {
  system: { icon: <Security />, label: 'System', color: '#1976d2' },
  payment: { icon: <Payment />, label: 'Payment', color: '#388e3c' },
  user: { icon: <People />, label: 'User', color: '#f57c00' },
  business: { icon: <Business />, label: 'Business', color: '#7b1fa2' },
  lead: { icon: <Assignment />, label: 'Lead', color: '#d32f2f' },
  security: { icon: <Security />, label: 'Security', color: '#c62828' }
};

// Individual Alert Item Component
const AlertItem = ({ alert, onDismiss, onMarkAsRead, onViewDetails, onAction }) => {
  const [expanded, setExpanded] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const priority = ALERT_PRIORITIES[alert.priority] || ALERT_PRIORITIES.medium;
  const category = ALERT_CATEGORIES[alert.category] || ALERT_CATEGORIES.system;

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <ListItem
      sx={{
        border: 1,
        borderColor: alert.isRead ? 'grey.200' : priority.color + '.main',
        borderRadius: 2,
        mb: 1,
        backgroundColor: alert.isRead ? 'background.default' : priority.bgColor,
        '&:hover': {
          backgroundColor: priority.bgColor,
          transform: 'translateX(4px)',
          transition: 'all 0.2s ease-in-out'
        }
      }}
    >
      <ListItemIcon>
        <Badge
          badgeContent={alert.isRead ? null : '●'}
          color={priority.color}
          variant="dot"
        >
          <Avatar
            sx={{
              bgcolor: category.color,
              width: 40,
              height: 40
            }}
          >
            {category.icon}
          </Avatar>
        </Badge>
      </ListItemIcon>

      <ListItemText
        primary={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="subtitle2"
              fontWeight={alert.isRead ? 'medium' : 'bold'}
              sx={{ flexGrow: 1 }}
            >
              {alert.title}
            </Typography>
            <Chip
              size="small"
              icon={priority.icon}
              label={priority.label}
              color={priority.color}
              variant="outlined"
            />
            <Typography variant="caption" color="textSecondary">
              {getTimeAgo(alert.timestamp)}
            </Typography>
          </Box>
        }
        secondary={
          <Box>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: expanded ? 'none' : 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mt: 0.5
              }}
            >
              {alert.message}
            </Typography>
            
            {alert.details && expanded && (
              <Box mt={2}>
                <Typography variant="caption" color="textSecondary" gutterBottom>
                  Additional Details:
                </Typography>
                <Typography variant="body2">
                  {alert.details}
                </Typography>
              </Box>
            )}

            {alert.metrics && expanded && (
              <Box mt={2}>
                <Typography variant="caption" color="textSecondary" gutterBottom>
                  Metrics:
                </Typography>
                {Object.entries(alert.metrics).map(([key, value]) => (
                  <Chip
                    key={key}
                    size="small"
                    label={`${key}: ${value}`}
                    variant="outlined"
                    sx={{ mr: 1, mb: 0.5 }}
                  />
                ))}
              </Box>
            )}

            {alert.actions && alert.actions.length > 0 && (
              <Box mt={2} display="flex" gap={1}>
                {alert.actions.map((action, index) => (
                  <Button
                    key={index}
                    size="small"
                    variant={action.primary ? 'contained' : 'outlined'}
                    color={action.color || 'primary'}
                    onClick={() => onAction(alert.id, action)}
                  >
                    {action.label}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        }
      />

      <ListItemSecondaryAction>
        <Box display="flex" alignItems="center" gap={1}>
          {alert.details && (
            <IconButton
              size="small"
              onClick={() => setExpanded(!expanded)}
            >
              <ExpandMore
                sx={{
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s'
                }}
              />
            </IconButton>
          )}
          
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </Box>
      </ListItemSecondaryAction>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {!alert.isRead && (
          <MenuItem onClick={() => { onMarkAsRead(alert.id); handleMenuClose(); }}>
            <CheckCircle sx={{ mr: 2 }} />
            Mark as Read
          </MenuItem>
        )}
        <MenuItem onClick={() => { onViewDetails(alert); handleMenuClose(); }}>
          <Visibility sx={{ mr: 2 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => { onDismiss(alert.id); handleMenuClose(); }}>
          <Archive sx={{ mr: 2 }} />
          Archive
        </MenuItem>
        <MenuItem onClick={() => { onDismiss(alert.id, true); handleMenuClose(); }} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Menu>
    </ListItem>
  );
};

// Alert Details Dialog
const AlertDetailsDialog = ({ open, alert, onClose, onAction }) => {
  if (!alert) return null;

  const priority = ALERT_PRIORITIES[alert.priority] || ALERT_PRIORITIES.medium;
  const category = ALERT_CATEGORIES[alert.category] || ALERT_CATEGORIES.system;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: category.color }}>
              {category.icon}
            </Avatar>
            <Box>
              <Typography variant="h6">{alert.title}</Typography>
              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                <Chip
                  size="small"
                  icon={priority.icon}
                  label={priority.label}
                  color={priority.color}
                />
                <Chip
                  size="small"
                  label={category.label}
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box mb={3}>
          <Typography variant="body1" paragraph>
            {alert.message}
          </Typography>
          
          {alert.details && (
            <Alert severity={priority.color} sx={{ mb: 2 }}>
              <AlertTitle>Details</AlertTitle>
              {alert.details}
            </Alert>
          )}
        </Box>

        {alert.metrics && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Metrics & Data
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableBody>
                  {Object.entries(alert.metrics).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {alert.affectedSystems && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Affected Systems
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {alert.affectedSystems.map((system, index) => (
                <Chip
                  key={index}
                  label={system}
                  color="warning"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        <Box>
          <Typography variant="body2" color="textSecondary">
            <strong>Created:</strong> {new Date(alert.timestamp).toLocaleString()}
          </Typography>
          {alert.resolvedAt && (
            <Typography variant="body2" color="textSecondary">
              <strong>Resolved:</strong> {new Date(alert.resolvedAt).toLocaleString()}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {alert.actions && alert.actions.map((action, index) => (
          <Button
            key={index}
            variant={action.primary ? 'contained' : 'outlined'}
            color={action.color || 'primary'}
            onClick={() => {
              onAction(alert.id, action);
              onClose();
            }}
          >
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

// Alert Settings Dialog
const AlertSettingsDialog = ({ open, onClose, settings, onSettingsChange }) => {
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
      <DialogTitle>Alert Settings</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={localSettings.enableRealTime}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, enableRealTime: e.target.checked }))}
              />
            }
            label="Real-time alerts"
            sx={{ mb: 2, display: 'block' }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={localSettings.enableSound}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, enableSound: e.target.checked }))}
              />
            }
            label="Sound notifications"
            sx={{ mb: 2, display: 'block' }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={localSettings.enableEmail}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, enableEmail: e.target.checked }))}
              />
            }
            label="Email notifications"
            sx={{ mb: 2, display: 'block' }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Auto-dismiss after</InputLabel>
            <Select
              value={localSettings.autoDismissTime}
              label="Auto-dismiss after"
              onChange={(e) => setLocalSettings(prev => ({ ...prev, autoDismissTime: e.target.value }))}
            >
              <MenuItem value={0}>Never</MenuItem>
              <MenuItem value={5}>5 minutes</MenuItem>
              <MenuItem value={15}>15 minutes</MenuItem>
              <MenuItem value={60}>1 hour</MenuItem>
              <MenuItem value={1440}>24 hours</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom>
            Priority Filters
          </Typography>
          
          {Object.entries(ALERT_PRIORITIES).map(([key, priority]) => (
            <FormControlLabel
              key={key}
              control={
                <Switch
                  checked={localSettings.priorityFilters[key]}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    priorityFilters: {
                      ...prev.priorityFilters,
                      [key]: e.target.checked
                    }
                  }))}
                />
              }
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  {priority.icon}
                  {priority.label} Priority
                </Box>
              }
              sx={{ mb: 1, display: 'block' }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save Settings</Button>
      </DialogActions>
    </Dialog>
  );
};

// Main AlertsPanel Component
const AlertsPanel = ({ 
  alerts = null, 
  loading = false, 
  onRefresh, 
  maxHeight = 600,
  showSettings = true,
  enableRealTime = true 
}) => {
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    priority: 'all',
    status: 'all'
  });
  
  const [settings, setSettings] = useState({
    enableRealTime: true,
    enableSound: false,
    enableEmail: true,
    autoDismissTime: 0,
    priorityFilters: {
      critical: true,
      high: true,
      medium: true,
      low: false
    }
  });

  // Mock alerts data
  const mockAlerts = [
    {
      id: '1',
      title: 'Database Backup Overdue',
      message: 'Automated database backup has not run for 2 hours. System may be at risk.',
      category: 'system',
      priority: 'critical',
      timestamp: new Date(Date.now() - 7200000),
      isRead: false,
      details: 'The automated backup script failed to execute at the scheduled time. This could be due to high server load or a system error.',
      metrics: {
        lastBackup: '2 hours ago',
        backupSize: '2.3 GB',
        failureCount: 3
      },
      affectedSystems: ['Database', 'File Storage'],
      actions: [
        { label: 'Run Backup Now', primary: true, color: 'error', action: 'run_backup' },
        { label: 'Check Logs', action: 'view_logs' }
      ]
    },
    {
      id: '2',
      title: 'Payment Gateway Issues',
      message: 'Razorpay gateway showing 2% failure rate in last hour.',
      category: 'payment',
      priority: 'high',
      timestamp: new Date(Date.now() - 3600000),
      isRead: false,
      details: 'Multiple payment transactions are failing with gateway timeout errors.',
      metrics: {
        failureRate: '2.1%',
        failedTransactions: 12,
        totalTransactions: 580
      },
      actions: [
        { label: 'Switch to PayU', primary: true, color: 'warning', action: 'switch_gateway' },
        { label: 'Contact Support', action: 'contact_support' }
      ]
    },
    {
      id: '3',
      title: '15 Broker Registrations Pending',
      message: 'Multiple broker registration requests waiting for approval.',
      category: 'user',
      priority: 'medium',
      timestamp: new Date(Date.now() - 1800000),
      isRead: false,
      details: 'New broker registrations have been pending for more than 30 minutes.',
      metrics: {
        pendingCount: 15,
        avgWaitTime: '35 minutes',
        oldestRequest: '2 hours ago'
      },
      actions: [
        { label: 'Review Applications', primary: true, action: 'review_brokers' },
        { label: 'Bulk Approve', action: 'bulk_approve' }
      ]
    },
    {
      id: '4',
      title: 'Lead Distribution Anomaly',
      message: 'Unusual pattern detected in lead distribution to brokers.',
      category: 'lead',
      priority: 'high',
      timestamp: new Date(Date.now() - 900000),
      isRead: true,
      details: 'Some leads are being assigned to inactive brokers or brokers with insufficient balance.',
      metrics: {
        affectedLeads: 8,
        inactiveBrokers: 3,
        distributionAccuracy: '92%'
      },
      actions: [
        { label: 'Fix Distribution', primary: true, color: 'error', action: 'fix_distribution' },
        { label: 'Pause Auto-Distribution', action: 'pause_distribution' }
      ]
    },
    {
      id: '5',
      title: 'System Performance Alert',
      message: 'API response time has increased above normal thresholds.',
      category: 'system',
      priority: 'medium',
      timestamp: new Date(Date.now() - 600000),
      isRead: true,
      details: 'Average response time is 450ms, which is above the 300ms threshold.',
      metrics: {
        avgResponseTime: '450ms',
        threshold: '300ms',
        slowestEndpoint: '/api/leads/distribute'
      }
    }
  ];

  const alertsData = alerts || mockAlerts;

  useEffect(() => {
    // Filter alerts based on current filters and settings
    let filtered = alertsData.filter(alert => {
      if (filters.category !== 'all' && alert.category !== filters.category) return false;
      if (filters.priority !== 'all' && alert.priority !== filters.priority) return false;
      if (filters.status === 'unread' && alert.isRead) return false;
      if (filters.status === 'read' && !alert.isRead) return false;
      if (!settings.priorityFilters[alert.priority]) return false;
      
      return true;
    });

    // Sort by priority and timestamp
    filtered.sort((a, b) => {
      const priorityA = ALERT_PRIORITIES[a.priority]?.level || 0;
      const priorityB = ALERT_PRIORITIES[b.priority]?.level || 0;
      
      if (priorityA !== priorityB) {
        return priorityB - priorityA; // Higher priority first
      }
      
      return new Date(b.timestamp) - new Date(a.timestamp); // Newer first
    });

    setFilteredAlerts(filtered);
  }, [alertsData, filters, settings]);

  // Real-time updates simulation
  useEffect(() => {
    if (enableRealTime && onRefresh) {
      const interval = setInterval(() => {
        onRefresh();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [enableRealTime, onRefresh]);

  const handleDismiss = (alertId, permanent = false) => {
    // Implementation would depend on your backend API
    console.log(`${permanent ? 'Deleting' : 'Archiving'} alert:`, alertId);
  };

  const handleMarkAsRead = (alertId) => {
    // Implementation would depend on your backend API
    console.log('Marking as read:', alertId);
  };

  const handleViewDetails = (alert) => {
    setSelectedAlert(alert);
    setDetailsOpen(true);
  };

  const handleAction = (alertId, action) => {
    // Implementation would depend on your backend API
    console.log('Executing action:', action.action, 'for alert:', alertId);
  };

  const getAlertCountsByPriority = () => {
    const counts = {};
    Object.keys(ALERT_PRIORITIES).forEach(priority => {
      counts[priority] = alertsData.filter(alert => 
        alert.priority === priority && !alert.isRead
      ).length;
    });
    return counts;
  };

  const unreadCount = alertsData.filter(alert => !alert.isRead).length;
  const priorityCounts = getAlertCountsByPriority();

  return (
    <>
      <Card elevation={3}>
        <CardContent>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Badge badgeContent={unreadCount} color="error" max={99}>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <NotificationsActive />
                </Avatar>
              </Badge>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  System Alerts
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {unreadCount} unread • {alertsData.length} total
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              {enableRealTime && (
                <Tooltip title="Real-time updates enabled">
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: 'success.main',
                      animation: 'pulse 2s infinite'
                    }}
                  />
                </Tooltip>
              )}

              {onRefresh && (
                <Tooltip title="Refresh Alerts">
                  <IconButton onClick={onRefresh} disabled={loading}>
                    <Refresh />
                  </IconButton>
                </Tooltip>
              )}

              {showSettings && (
                <Tooltip title="Alert Settings">
                  <IconButton onClick={() => setSettingsOpen(true)}>
                    <Settings />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>

          {loading && <LinearProgress sx={{ mb: 2 }} />}

          {/* Priority Summary */}
          <Box display="flex" gap={1} mb={3} flexWrap="wrap">
            {Object.entries(priorityCounts).map(([priority, count]) => (
              <Chip
                key={priority}
                icon={ALERT_PRIORITIES[priority].icon}
                label={`${ALERT_PRIORITIES[priority].label}: ${count}`}
                color={ALERT_PRIORITIES[priority].color}
                variant={count > 0 ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Box>

          {/* Filters */}
          <Box display="flex" gap={2} mb={3} flexWrap="wrap">
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {Object.entries(ALERT_CATEGORIES).map(([key, category]) => (
                  <MenuItem key={key} value={key}>
                    <Box display="flex" alignItems="center" gap={1}>
                      {category.icon}
                      {category.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filters.priority}
                label="Priority"
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
              >
                <MenuItem value="all">All Priorities</MenuItem>
                {Object.entries(ALERT_PRIORITIES).map(([key, priority]) => (
                  <MenuItem key={key} value={key}>
                    <Box display="flex" alignItems="center" gap={1}>
                      {priority.icon}
                      {priority.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="unread">Unread</MenuItem>
                <MenuItem value="read">Read</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Alerts List */}
          <Box sx={{ maxHeight: maxHeight, overflow: 'auto' }}>
            {filteredAlerts.length === 0 ? (
              <Box textAlign="center" py={4}>
                <NotificationsActive sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  No alerts to display
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {alertsData.length === 0 
                    ? 'All systems are running smoothly!'
                    : 'Try adjusting your filters to see more alerts.'
                  }
                </Typography>
              </Box>
            ) : (
              <List>
                {filteredAlerts.map((alert) => (
                  <AlertItem
                    key={alert.id}
                    alert={alert}
                    onDismiss={handleDismiss}
                    onMarkAsRead={handleMarkAsRead}
                    onViewDetails={handleViewDetails}
                    onAction={handleAction}
                  />
                ))}
              </List>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Alert Details Dialog */}
      <AlertDetailsDialog
        open={detailsOpen}
        alert={selectedAlert}
        onClose={() => setDetailsOpen(false)}
        onAction={handleAction}
      />

      {/* Settings Dialog */}
      <AlertSettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </>
  );
};

export default AlertsPanel;
