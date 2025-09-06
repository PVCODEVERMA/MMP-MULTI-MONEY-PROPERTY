// src/components/superAdmin/dashboard/QuickActions.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
  Tooltip,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Badge,
  CircularProgress,
  LinearProgress,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Add,
  Share,
  People,
  Business,
  Assignment,
  Payment,
  Security,
  Settings,
  Refresh,
  Download,
  Upload,
  Email,
  Sms,
  WhatsApp,
  Phone,
  CheckCircle,
  Warning,
  Error,
  Analytics,
  Timeline,
  AttachMoney,
  Notifications,
  Storage,
  CloudUpload,
  PlayArrow,
  Pause,
  Stop,
  RestartAlt,
  Build,
  Update,
  Backup,
  PersonAdd,
  GroupAdd,
  AssignmentAdd,
  PaymentAdd,
  VerifiedUser,
  ManageAccounts,
  ExpandMore,
  Close,
  Launch,
  Speed
} from '@mui/icons-material';
import { useSuperAdminApi } from '../../../hooks/useSuperAdminApi';

// Quick Action Button Component
const QuickActionButton = ({ 
  title, 
  description, 
  icon, 
  color = 'primary', 
  onClick, 
  disabled = false, 
  loading = false,
  badge = null,
  size = 'medium'
}) => (
  <Card 
    elevation={2}
    sx={{ 
      height: '100%',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'all 0.3s ease',
      '&:hover': !disabled ? {
        elevation: 6,
        transform: 'translateY(-2px)',
        backgroundColor: `${color}.light`
      } : {}
    }}
    onClick={!disabled && !loading ? onClick : undefined}
  >
    <CardContent sx={{ textAlign: 'center', p: size === 'small' ? 2 : 3 }}>
      <Badge 
        badgeContent={badge} 
        color="error" 
        invisible={!badge}
        sx={{ mb: 2 }}
      >
        <Avatar
          sx={{
            bgcolor: `${color}.main`,
            width: size === 'small' ? 48 : 64,
            height: size === 'small' ? 48 : 64,
            mx: 'auto',
            mb: 2
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : icon}
        </Avatar>
      </Badge>
      
      <Typography 
        variant={size === 'small' ? 'subtitle2' : 'h6'} 
        fontWeight="bold" 
        gutterBottom
      >
        {title}
      </Typography>
      
      <Typography 
        variant="body2" 
        color="textSecondary"
        sx={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {description}
      </Typography>
    </CardContent>
  </Card>
);

// Bulk Action Dialog
const BulkActionDialog = ({ open, action, onClose, onExecute }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [processing, setProcessing] = useState(false);

  const handleExecute = async () => {
    setProcessing(true);
    try {
      await onExecute(action.type, selectedItems);
      onClose();
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (!action) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          {action.icon}
          <Typography variant="h6">{action.title}</Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 3 }}>
          This action will affect multiple items. Please review carefully before proceeding.
        </Alert>
        
        <Typography variant="body1" paragraph>
          {action.description}
        </Typography>

        {/* Mock selection interface */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Select items to process:
          </Typography>
          <List dense>
            {[1, 2, 3, 4, 5].map((item) => (
              <ListItem key={item} button>
                <ListItemIcon>
                  <CheckCircle color={selectedItems.includes(item) ? 'primary' : 'disabled'} />
                </ListItemIcon>
                <ListItemText 
                  primary={`Item ${item}`}
                  secondary="Sample description"
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} disabled={processing}>
          Cancel
        </Button>
        <Button 
          onClick={handleExecute} 
          variant="contained" 
          disabled={processing || selectedItems.length === 0}
          startIcon={processing ? <CircularProgress size={16} /> : action.icon}
        >
          {processing ? 'Processing...' : `Execute ${action.title}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// System Status Quick View
const SystemStatusQuickView = ({ onViewDetails }) => {
  const [systemStatus, setSystemStatus] = useState({
    overallHealth: 98,
    criticalAlerts: 2,
    pendingTasks: 8,
    activeUsers: 145
  });

  return (
    <Card elevation={2}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            System Status
          </Typography>
          <IconButton size="small" onClick={onViewDetails}>
            <Launch />
          </IconButton>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {systemStatus.overallHealth}%
              </Typography>
              <Typography variant="caption" color="textSecondary">
                System Health
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography variant="h4" color="error.main" fontWeight="bold">
                {systemStatus.criticalAlerts}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Critical Alerts
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {systemStatus.pendingTasks}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Pending Tasks
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography variant="h4" color="info.main" fontWeight="bold">
                {systemStatus.activeUsers}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Active Users
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Recent Activities Summary
const RecentActivitiesSummary = ({ activities, onViewAll }) => (
  <Card elevation={2}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Recent Activities
        </Typography>
        <Button size="small" onClick={onViewAll} endIcon={<Launch />}>
          View All
        </Button>
      </Box>

      <List dense>
        {(activities || [
          { type: 'lead_distributed', message: 'Lead shared to 3 brokers', time: '2 min ago' },
          { type: 'company_verified', message: 'ABC Realty verified', time: '5 min ago' },
          { type: 'payment_received', message: '₹25,000 package payment', time: '8 min ago' },
          { type: 'broker_registered', message: 'New broker registration', time: '12 min ago' }
        ]).slice(0, 4).map((activity, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemIcon>
                {activity.type === 'lead_distributed' && <Share color="primary" />}
                {activity.type === 'company_verified' && <VerifiedUser color="success" />}
                {activity.type === 'payment_received' && <AttachMoney color="info" />}
                {activity.type === 'broker_registered' && <PersonAdd color="warning" />}
              </ListItemIcon>
              <ListItemText
                primary={activity.message}
                secondary={activity.time}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
            {index < 3 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </CardContent>
  </Card>
);

// Main QuickActions Component
const QuickActions = ({ onNavigate, loading = false }) => {
  const [bulkActionDialog, setBulkActionDialog] = useState({ open: false, action: null });
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});

  const { 
    distributeLeads, 
    verifyCompanies, 
    processPayments, 
    runSystemMaintenance 
  } = useSuperAdminApi();

  // Primary Quick Actions
  const primaryActions = [
    {
      id: 'distribute-leads',
      title: 'Distribute Leads',
      description: 'Share leads to multiple brokers instantly',
      icon: <Share />,
      color: 'primary',
      badge: 12,
      action: () => handleQuickAction('distribute-leads')
    },
    {
      id: 'add-company',
      title: 'Add Company',
      description: 'Register new real estate company',
      icon: <Business />,
      color: 'success',
      action: () => onNavigate('/super-admin/companies/new')
    },
    {
      id: 'manage-brokers',
      title: 'Manage Brokers',
      description: 'View and manage broker accounts',
      icon: <People />,
      color: 'info',
      badge: 5,
      action: () => onNavigate('/super-admin/brokers')
    },
    {
      id: 'verify-companies',
      title: 'Company Verification',
      description: 'Verify pending company registrations',
      icon: <VerifiedUser />,
      color: 'warning',
      badge: 8,
      action: () => handleQuickAction('verify-companies')
    },
    {
      id: 'process-payments',
      title: 'Process Payments',
      description: 'Review and process pending payments',
      icon: <Payment />,
      color: 'secondary',
      badge: 3,
      action: () => handleQuickAction('process-payments')
    },
    {
      id: 'system-maintenance',
      title: 'System Maintenance',
      description: 'Run system cleanup and optimization',
      icon: <Build />,
      color: 'error',
      action: () => handleQuickAction('system-maintenance')
    }
  ];

  // Secondary Quick Actions
  const secondaryActions = [
    {
      id: 'backup-system',
      title: 'Backup System',
      description: 'Create system backup',
      icon: <Backup />,
      color: 'primary'
    },
    {
      id: 'send-notifications',
      title: 'Send Notifications',
      description: 'Broadcast alerts to users',
      icon: <Notifications />,
      color: 'warning'
    },
    {
      id: 'generate-reports',
      title: 'Generate Reports',
      description: 'Create analytics reports',
      icon: <Analytics />,
      color: 'info'
    },
    {
      id: 'bulk-operations',
      title: 'Bulk Operations',
      description: 'Perform batch operations',
      icon: <Speed />,
      color: 'secondary'
    }
  ];

  // Bulk Actions for SpeedDial
  const bulkActions = [
    {
      type: 'bulk-approve-brokers',
      title: 'Bulk Approve Brokers',
      description: 'Approve multiple broker registrations at once',
      icon: <GroupAdd />,
      color: 'success'
    },
    {
      type: 'bulk-distribute-leads',
      title: 'Bulk Distribute Leads',
      description: 'Distribute multiple leads to brokers simultaneously',
      icon: <AssignmentAdd />,
      color: 'primary'
    },
    {
      type: 'bulk-process-payments',
      title: 'Bulk Process Payments',
      description: 'Process multiple payments in batch',
      icon: <PaymentAdd />,
      color: 'info'
    },
    {
      type: 'bulk-send-notifications',
      title: 'Bulk Send Notifications',
      description: 'Send notifications to multiple users',
      icon: <Email />,
      color: 'warning'
    }
  ];

  const handleQuickAction = async (actionId) => {
    setLoadingStates(prev => ({ ...prev, [actionId]: true }));
    
    try {
      switch (actionId) {
        case 'distribute-leads':
          // Navigate to lead distribution page
          onNavigate('/super-admin/leads/distribute');
          break;
          
        case 'verify-companies':
          // Navigate to company verification
          onNavigate('/super-admin/companies?filter=pending-verification');
          break;
          
        case 'process-payments':
          // Navigate to payments processing
          onNavigate('/super-admin/payments?status=pending');
          break;
          
        case 'system-maintenance':
          // Run system maintenance
          await runSystemMaintenance();
          break;
          
        default:
          console.log('Action:', actionId);
      }
    } catch (error) {
      console.error('Quick action failed:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [actionId]: false }));
    }
  };

  const handleBulkAction = (action) => {
    setBulkActionDialog({ open: true, action });
  };

  const executeBulkAction = async (actionType, selectedItems) => {
    // Implementation would depend on the specific bulk action
    console.log('Executing bulk action:', actionType, 'for items:', selectedItems);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Quick Actions
        </Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={() => window.location.reload()}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {/* System Status Quick View */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SystemStatusQuickView 
              onViewDetails={() => onNavigate('/super-admin/system-health')} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentActivitiesSummary
              onViewAll={() => onNavigate('/super-admin/activities')}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Primary Quick Actions */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Primary Actions
        </Typography>
        <Grid container spacing={3}>
          {primaryActions.map((action) => (
            <Grid item xs={12} sm={6} md={4} key={action.id}>
              <QuickActionButton
                {...action}
                loading={loadingStates[action.id]}
                onClick={action.action}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Secondary Quick Actions */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" fontWeight="bold">
            Secondary Actions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {secondaryActions.map((action) => (
              <Grid item xs={6} sm={4} md={3} key={action.id}>
                <QuickActionButton
                  {...action}
                  size="small"
                  onClick={() => handleQuickAction(action.id)}
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Speed Dial for Bulk Actions */}
      <SpeedDial
        ariaLabel="Bulk Actions SpeedDial"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        icon={<SpeedDialIcon />}
        open={speedDialOpen}
        onOpen={() => setSpeedDialOpen(true)}
        onClose={() => setSpeedDialOpen(false)}
      >
        {bulkActions.map((action) => (
          <SpeedDialAction
            key={action.type}
            icon={action.icon}
            tooltipTitle={action.title}
            onClick={() => {
              handleBulkAction(action);
              setSpeedDialOpen(false);
            }}
          />
        ))}
      </SpeedDial>

      {/* Bulk Action Dialog */}
      <BulkActionDialog
        open={bulkActionDialog.open}
        action={bulkActionDialog.action}
        onClose={() => setBulkActionDialog({ open: false, action: null })}
        onExecute={executeBulkAction}
      />
    </Box>
  );
};

export default QuickActions;
