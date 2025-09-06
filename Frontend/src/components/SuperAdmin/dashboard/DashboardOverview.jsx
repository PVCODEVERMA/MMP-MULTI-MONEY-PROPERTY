// src/components/superAdmin/dashboard/DashboardOverview.jsx
import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, Avatar, LinearProgress, useTheme, useMediaQuery } from '@mui/material';
import { TrendingUp, Business, People, Assignment, AttachMoney } from '@mui/icons-material';
import SystemHealthCard from './SystemHealthCard';
import RevenueChart from './RevenueChart';
import UserActivityChart from './UserActivityChart';
import AlertsPanel from './AlertsPanel';
import QuickActions from './QuickActions';
import toast from 'react-hot-toast';

// MMP System Dummy Data
const DASHBOARD_DATA = {
  liveStats: {
    totalCompanies: 45,
    activeBrokers: 980,
    leadsToday: 89,
    monthlyRevenue: 25000000,
    leadDistribution: {
      sharedTo3Brokers: 12580,
      exclusiveLeads: 2840
    }
  },
  systemHealth: {
    overallHealth: 98,
    services: [
      { name: 'Lead Distribution Engine', status: 'Online', performance: 98 },
      { name: 'Payment Gateway (Razorpay)', status: 'Online', performance: 95 },
      { name: 'WhatsApp API (Interakt)', status: 'Online', performance: 92 },
      { name: 'Tele-verification Service', status: 'Online', performance: 88 }
    ]
  }
};

const StatsCard = ({ title, value, change, icon, color = 'primary', onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Card 
      elevation={3} 
      sx={{ 
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        '&:hover': onClick ? { transform: 'translateY(-4px)', boxShadow: theme.shadows[8] } : {}
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box flex="1">
            <Typography color="textSecondary" gutterBottom variant={isMobile ? "caption" : "body2"}>
              {title}
            </Typography>
            <Typography variant={isMobile ? "h5" : "h3"} fontWeight="bold" color={`${color}.main`}>
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}.light`, width: { xs: 48, sm: 56 }, height: { xs: 48, sm: 56 } }}>
            {React.cloneElement(icon, { sx: { fontSize: { xs: 24, sm: 28 }, color: `${color}.main` } })}
          </Avatar>
        </Box>
        
        {change && (
          <Box display="flex" alignItems="center">
            <TrendingUp color="success" fontSize="small" />
            <Typography variant="body2" color="success.main" ml={0.5} fontWeight="medium">
              {change} from last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardOverview = () => {
  const [dashboardData, setDashboardData] = useState(DASHBOARD_DATA);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        liveStats: {
          ...prev.liveStats,
          leadsToday: prev.liveStats.leadsToday + Math.floor(Math.random() * 3)
        }
      }));
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleStatsClick = (section) => {
    toast.success(`Navigating to ${section}...`);
  };

  const handleRefresh = () => {
    setLoading(true);
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setLastUpdated(new Date());
          resolve('Dashboard refreshed successfully!');
        }, 1500);
      }),
      {
        loading: 'Refreshing dashboard...',
        success: 'Dashboard updated with latest data!',
        error: 'Failed to refresh dashboard',
      }
    ).finally(() => setLoading(false));
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={4} gap={{ xs: 2, sm: 0 }}>
        <Box>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            MMP Super Admin Dashboard
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Multi-Modal Property Lead Management Platform (Phase 1 MVP)
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </Typography>
      </Box>

      {loading && <LinearProgress sx={{ mb: 3 }} />}

      {/* Main KPI Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} mb={4}>
        <Grid item xs={6} sm={6} md={3}>
          <StatsCard
            title="Total Companies"
            value={dashboardData.liveStats.totalCompanies}
            change="+12.5%"
            icon={<Business />}
            color="primary"
            onClick={() => handleStatsClick('companies')}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatsCard
            title="Active Brokers"
            value={dashboardData.liveStats.activeBrokers.toLocaleString()}
            change="+8.3%"
            icon={<People />}
            color="success"
            onClick={() => handleStatsClick('brokers')}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatsCard
            title="Monthly Revenue"
            value={`₹${(dashboardData.liveStats.monthlyRevenue / 10000000).toFixed(1)}Cr`}
            change="+25.5%"
            icon={<AttachMoney />}
            color="info"
            onClick={() => handleStatsClick('payments')}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatsCard
            title="Leads Today"
            value={dashboardData.liveStats.leadsToday}
            change="+15.2%"
            icon={<Assignment />}
            color="warning"
            onClick={() => handleStatsClick('leads')}
          />
        </Grid>
      </Grid>

      {/* Lead Distribution Stats */}
      <Grid container spacing={{ xs: 2, sm: 3 }} mb={4}>
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Lead Distribution Engine (Phase 1 Core Feature)
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary.main" fontWeight="bold">
                      {dashboardData.liveStats.leadDistribution.sharedTo3Brokers.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Shared to 3 Brokers
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="secondary.main" fontWeight="bold">
                      {dashboardData.liveStats.leadDistribution.exclusiveLeads.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Exclusive Leads
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dashboard Components */}
      <Grid container spacing={{ xs: 2, sm: 3 }} mb={4}>
        <Grid item xs={12} lg={8}>
          <SystemHealthCard healthData={dashboardData.systemHealth} loading={loading} onRefresh={handleRefresh} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <QuickActions onNavigate={(path) => toast.success(`Navigating to ${path}`)} />
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, sm: 3 }} mb={4}>
        <Grid item xs={12} lg={8}>
          <RevenueChart title="Revenue Analytics (Packages vs Wallet)" period="Last 6 Months" />
        </Grid>
        <Grid item xs={12} lg={4}>
          <AlertsPanel />
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <UserActivityChart title="User Activity Analytics" period="Last 30 Days" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOverview;
