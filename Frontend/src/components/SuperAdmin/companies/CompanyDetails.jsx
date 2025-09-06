// src/components/superAdmin/companies/CompanyDetails.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Card,
  CardContent,
  Tab,
  Tabs,
  LinearProgress,
  Alert,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Business,
  LocationOn,
  Email,
  Phone,
  Language,
  Edit,
  Close,
  Verified,
  CheckCircle,
  Cancel,
  People,
  TrendingUp,
  Assignment,
  Payment,
  Description,
  CalendarToday,
  AccountBalance
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useCompanyApi } from '../../../hooks/useCompanyApi';

const CompanyDetails = ({ open, company, onClose, onEdit, onRefresh }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [brokers, setBrokers] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  const { getCompanyDetails, getCompanyBrokers, getCompanyRevenue, toggleCompanyStatus, verifyCompany } = useCompanyApi();

  useEffect(() => {
    if (open && company) {
      fetchCompanyDetails();
    }
  }, [open, company]);

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      const [details, brokersData, revenue] = await Promise.all([
        getCompanyDetails(company._id),
        getCompanyBrokers(company._id),
        getCompanyRevenue(company._id, { period: '6m' })
      ]);
      
      setCompanyDetails(details.data);
      setBrokers(brokersData.data);
      setRevenueData(revenue.data);
    } catch (error) {
      console.error('Failed to fetch company details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    try {
      await toggleCompanyStatus(company._id);
      onRefresh();
      fetchCompanyDetails();
    } catch (error) {
      console.error('Failed to toggle company status:', error);
    }
  };

  const handleVerifyCompany = async () => {
    try {
      await verifyCompany(company._id);
      onRefresh();
      fetchCompanyDetails();
    } catch (error) {
      console.error('Failed to verify company:', error);
    }
  };

  const getStatusColor = (status) => {
    if (!status?.isActive) return 'error';
    if (!status?.isVerified) return 'warning';
    return 'success';
  };

  const getStatusText = (status) => {
    if (!status?.isActive) return 'Suspended';
    if (!status?.isVerified) return 'Pending Verification';
    return 'Active';
  };

  if (!company) return null;

  const displayCompany = companyDetails || company;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: { height: '90vh' }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
              <Business />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {displayCompany.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {displayCompany.businessType?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap={1}>
            <Tooltip title="Edit Company">
              <IconButton onClick={() => onEdit(displayCompany)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {loading && <LinearProgress />}

        {/* Status Chips */}
        <Box display="flex" gap={1} mb={3} flexWrap="wrap">
          <Chip
            label={getStatusText(displayCompany)}
            color={getStatusColor(displayCompany)}
            size="medium"
          />
          {displayCompany.isVerified && (
            <Chip
              icon={<Verified />}
              label="Verified"
              color="primary"
              size="medium"
            />
          )}
          <Chip
            label={`Created ${new Date(displayCompany.createdAt).toLocaleDateString()}`}
            variant="outlined"
            size="medium"
          />
        </Box>

        {/* Action Alerts */}
        {!displayCompany.isVerified && (
          <Alert 
            severity="warning" 
            sx={{ mb: 2 }}
            action={
              <Button size="small" onClick={handleVerifyCompany}>
                Verify Now
              </Button>
            }
          >
            This company is pending verification
          </Alert>
        )}

        {!displayCompany.isActive && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            action={
              <Button size="small" onClick={handleToggleStatus}>
                Activate
              </Button>
            }
          >
            This company is currently suspended
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Company Information" />
          <Tab label={`Brokers (${brokers.length})`} />
          <Tab label="Revenue & Analytics" />
          <Tab label="Settings & Permissions" />
        </Tabs>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Email />
                      </ListItemIcon>
                      <ListItemText
                        primary={displayCompany.contactInfo?.email || 'Not provided'}
                        secondary="Email Address"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText
                        primary={displayCompany.contactInfo?.phone || 'Not provided'}
                        secondary="Phone Number"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Language />
                      </ListItemIcon>
                      <ListItemText
                        primary={displayCompany.contactInfo?.website || 'Not provided'}
                        secondary="Website"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Address Information */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Address Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${displayCompany.address?.street || 'N/A'}`}
                        secondary="Street Address"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`${displayCompany.address?.city || 'N/A'}, ${displayCompany.address?.state || 'N/A'}`}
                        secondary="City, State"
                        sx={{ pl: 7 }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`${displayCompany.address?.zipCode || 'N/A'} - ${displayCompany.address?.country || 'India'}`}
                        secondary="ZIP Code - Country"
                        sx={{ pl: 7 }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* License Information */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    License & Compliance Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          RERA Number
                        </Typography>
                        <Typography variant="body1">
                          {displayCompany.licenseInfo?.reraNumber || 'Not provided'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          RERA State
                        </Typography>
                        <Typography variant="body1">
                          {displayCompany.licenseInfo?.reraState || 'Not provided'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          License Expiry
                        </Typography>
                        <Typography variant="body1">
                          {displayCompany.licenseInfo?.expiryDate 
                            ? new Date(displayCompany.licenseInfo.expiryDate).toLocaleDateString()
                            : 'Not provided'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Company Brokers
              </Typography>
              {brokers.length === 0 ? (
                <Alert severity="info">
                  No brokers associated with this company yet.
                </Alert>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="right">Leads</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {brokers.map((broker) => (
                        <TableRow key={broker._id}>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {broker.name}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {broker.designation || 'Broker'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{broker.email}</TableCell>
                          <TableCell>{broker.phone}</TableCell>
                          <TableCell align="center">
                            <Chip
                              label={broker.isActive ? 'Active' : 'Inactive'}
                              color={broker.isActive ? 'success' : 'error'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">
                            {broker.totalLeads || 0}
                          </TableCell>
                          <TableCell align="right">
                            ₹{((broker.totalRevenue || 0) / 100000).toFixed(1)}L
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 2 && (
          <Grid container spacing={3}>
            {/* Revenue Metrics */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    ₹{((displayCompany.monthlyRevenue || 0) / 100000).toFixed(1)}L
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Monthly Revenue
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <People sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {displayCompany.brokerCount || 0}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Active Brokers
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Assignment sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="info.main">
                    {displayCompany.totalLeads || 0}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Leads
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Revenue Chart */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Revenue Trend (Last 6 Months)
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip 
                        formatter={(value) => [`₹${(value/100000).toFixed(1)}L`, 'Revenue']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#1976d2" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Company Settings
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Lead Distribution Mode"
                        secondary={displayCompany.settings?.leadDistributionMode || 'shared'}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Max Brokers Per Lead"
                        secondary={displayCompany.settings?.maxBrokersPerLead || 3}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Shared Lead Price"
                        secondary={`₹${displayCompany.settings?.leadPricing?.sharedPrice || 50}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Exclusive Lead Price"
                        secondary={`₹${displayCompany.settings?.leadPricing?.exclusivePrice || 150}`}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
        {!displayCompany.isVerified && (
          <Button onClick={handleVerifyCompany} variant="contained" color="success">
            Verify Company
          </Button>
        )}
        <Button onClick={() => onEdit(displayCompany)} variant="contained">
          Edit Company
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyDetails;
