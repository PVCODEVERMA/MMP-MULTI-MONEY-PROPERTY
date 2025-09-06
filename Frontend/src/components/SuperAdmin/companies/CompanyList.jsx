// src/components/superAdmin/companies/CompanyList.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { Business, Add, Visibility, VerifiedUser, Search, FilterList } from '@mui/icons-material';
import CompanyCard from './CompanyCard';
import toast from 'react-hot-toast';

const DUMMY_COMPANIES = [
  {
    id: 1,
    name: 'Premium Properties Mumbai',
    businessType: 'real_estate_agency',
    city: 'Mumbai',
    state: 'Maharashtra',
    email: 'contact@premiumprop.com',
    phone: '+91-22-12345678',
    reraNumber: 'MH/RERA/A52070017644',
    totalBrokers: 25,
    activeBrokers: 22,
    leadsReceived: 580,
    revenue: 3200000,
    isActive: true,
    isVerified: true,
    verificationStatus: 'completed',
    joinDate: '2023-06-15'
  },
  {
    id: 2,
    name: 'Elite Realty Delhi',
    businessType: 'builder',
    city: 'Delhi',
    state: 'Delhi',
    email: 'info@eliterealty.com',
    phone: '+91-11-87654321',
    reraNumber: 'DL/RERA/B45070021234',
    totalBrokers: 18,
    activeBrokers: 16,
    leadsReceived: 420,
    revenue: 2800000,
    isActive: true,
    isVerified: false,
    verificationStatus: 'pending',
    joinDate: '2023-08-20'
  }
];

const CompanyList = () => {
  const [companies, setCompanies] = useState(DUMMY_COMPANIES);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  const handleVerifyCompany = (companyId) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setCompanies(prev => prev.map(company => 
            company.id === companyId 
              ? { ...company, isVerified: true, verificationStatus: 'completed' }
              : company
          ));
          resolve('Company verified successfully!');
        }, 2000);
      }),
      {
        loading: 'Verifying company...',
        success: 'Company RERA verification completed!',
        error: 'Failed to verify company',
      }
    );
  };

  const handleAddCompany = () => {
    toast.success('Navigating to Add Company form...');
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'verified' && company.isVerified) ||
                         (filterStatus === 'pending' && !company.isVerified);
    return matchesSearch && matchesFilter;
  });

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Company Management
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Manage real estate companies and RERA verification
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={handleAddCompany}>
          Add Company
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Filter Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Filter Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Companies</MenuItem>
                  <MenuItem value="verified">RERA Verified</MenuItem>
                  <MenuItem value="pending">Pending Verification</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                fullWidth
              >
                {viewMode === 'table' ? 'Card View' : 'Table View'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Business />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {companies.length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Companies
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <VerifiedUser />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {companies.filter(c => c.isVerified).length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    RERA Verified
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Companies Display */}
      {viewMode === 'cards' ? (
        <Grid container spacing={3}>
          {filteredCompanies.map((company) => (
            <Grid item xs={12} md={6} lg={4} key={company.id}>
              <CompanyCard 
                company={company} 
                onVerify={() => handleVerifyCompany(company.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              All Companies
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Brokers</TableCell>
                    <TableCell>Revenue</TableCell>
                    <TableCell>RERA Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar>
                            <Business />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {company.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {company.businessType.replace('_', ' ').toUpperCase()}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {company.city}, {company.state}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {company.activeBrokers}/{company.totalBrokers}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Active/Total
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold" color="success.main">
                          ₹{(company.revenue / 100000).toFixed(1)}L
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={company.isVerified ? 'RERA Verified' : 'Pending'}
                          color={company.isVerified ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                          {!company.isVerified && (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleVerifyCompany(company.id)}
                            >
                              Verify
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CompanyList;
