// src/components/superAdmin/companies/CompanyForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Alert,
  FormControlLabel,
  Switch,
  Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const steps = ['Basic Information', 'Address Details', 'Contact Information', 'License & Settings'];

const businessTypes = [
  { value: 'real_estate_agency', label: 'Real Estate Agency' },
  { value: 'builder', label: 'Builder' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'individual', label: 'Individual' }
];

const subscriptionPlans = [
  { value: 'basic', label: 'Basic Plan' },
  { value: 'premium', label: 'Premium Plan' },
  { value: 'enterprise', label: 'Enterprise Plan' }
];

const CompanyForm = ({ open, company, onClose, onSave }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    businessType: 'real_estate_agency',
    registrationNumber: '',
    gstNumber: '',
    panNumber: '',
    
    // Address Details
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    
    // Contact Information
    contactInfo: {
      email: '',
      phone: '',
      website: ''
    },
    
    // License Information
    licenseInfo: {
      reraNumber: '',
      reraState: '',
      expiryDate: null
    },
    
    // Settings
    isActive: true,
    subscription: {
      plan: 'basic',
      isActive: false
    },
    settings: {
      leadDistributionMode: 'shared',
      maxBrokersPerLead: 3,
      leadPricing: {
        sharedPrice: 50,
        exclusivePrice: 150
      }
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (company && open) {
      setFormData({
        name: company.name || '',
        businessType: company.businessType || 'real_estate_agency',
        registrationNumber: company.registrationNumber || '',
        gstNumber: company.gstNumber || '',
        panNumber: company.panNumber || '',
        
        address: {
          street: company.address?.street || '',
          city: company.address?.city || '',
          state: company.address?.state || '',
          zipCode: company.address?.zipCode || '',
          country: company.address?.country || 'India'
        },
        
        contactInfo: {
          email: company.contactInfo?.email || '',
          phone: company.contactInfo?.phone || '',
          website: company.contactInfo?.website || ''
        },
        
        licenseInfo: {
          reraNumber: company.licenseInfo?.reraNumber || '',
          reraState: company.licenseInfo?.reraState || '',
          expiryDate: company.licenseInfo?.expiryDate ? dayjs(company.licenseInfo.expiryDate) : null
        },
        
        isActive: company.isActive !== undefined ? company.isActive : true,
        subscription: {
          plan: company.subscription?.plan || 'basic',
          isActive: company.subscription?.isActive || false
        },
        settings: {
          leadDistributionMode: company.settings?.leadDistributionMode || 'shared',
          maxBrokersPerLead: company.settings?.maxBrokersPerLead || 3,
          leadPricing: {
            sharedPrice: company.settings?.leadPricing?.sharedPrice || 50,
            exclusivePrice: company.settings?.leadPricing?.exclusivePrice || 150
          }
        }
      });
    } else if (!company && open) {
      // Reset form for new company
      setFormData({
        name: '',
        businessType: 'real_estate_agency',
        registrationNumber: '',
        gstNumber: '',
        panNumber: '',
        
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'India'
        },
        
        contactInfo: {
          email: '',
          phone: '',
          website: ''
        },
        
        licenseInfo: {
          reraNumber: '',
          reraState: '',
          expiryDate: null
        },
        
        isActive: true,
        subscription: {
          plan: 'basic',
          isActive: false
        },
        settings: {
          leadDistributionMode: 'shared',
          maxBrokersPerLead: 3,
          leadPricing: {
            sharedPrice: 50,
            exclusivePrice: 150
          }
        }
      });
      setActiveStep(0);
    }
    setErrors({});
  }, [company, open]);

  const handleChange = (field, value) => {
    const fields = field.split('.');
    
    setFormData(prev => {
      let updated = { ...prev };
      let current = updated;
      
      for (let i = 0; i < fields.length - 1; i++) {
        current[fields[i]] = { ...current[fields[i]] };
        current = current[fields[i]];
      }
      
      current[fields[fields.length - 1]] = value;
      return updated;
    });

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Basic Information
        if (!formData.name.trim()) newErrors['name'] = 'Company name is required';
        if (!formData.businessType) newErrors['businessType'] = 'Business type is required';
        break;
        
      case 1: // Address Details
        if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required';
        if (!formData.address.state.trim()) newErrors['address.state'] = 'State is required';
        break;
        
      case 2: // Contact Information
        if (!formData.contactInfo.email.trim()) {
          newErrors['contactInfo.email'] = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.contactInfo.email)) {
          newErrors['contactInfo.email'] = 'Email is invalid';
        }
        
        if (!formData.contactInfo.phone.trim()) {
          newErrors['contactInfo.phone'] = 'Phone is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.contactInfo.phone)) {
          newErrors['contactInfo.phone'] = 'Phone number is invalid';
        }
        break;
        
      case 3: // License & Settings
        // Optional validations
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      const submitData = {
        ...formData,
        licenseInfo: {
          ...formData.licenseInfo,
          expiryDate: formData.licenseInfo.expiryDate ? formData.licenseInfo.expiryDate.toISOString() : null
        }
      };
      onSave(submitData);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Company Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Business Type"
                value={formData.businessType}
                onChange={(e) => handleChange('businessType', e.target.value)}
                error={!!errors.businessType}
                helperText={errors.businessType}
                required
              >
                {businessTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Registration Number"
                value={formData.registrationNumber}
                onChange={(e) => handleChange('registrationNumber', e.target.value)}
                helperText="Company registration number"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="GST Number"
                value={formData.gstNumber}
                onChange={(e) => handleChange('gstNumber', e.target.value)}
                helperText="GST registration number"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="PAN Number"
                value={formData.panNumber}
                onChange={(e) => handleChange('panNumber', e.target.value)}
                helperText="Company PAN number"
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Address Information
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                value={formData.address.street}
                onChange={(e) => handleChange('address.street', e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="City"
                value={formData.address.city}
                onChange={(e) => handleChange('address.city', e.target.value)}
                error={!!errors['address.city']}
                helperText={errors['address.city']}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="State"
                value={formData.address.state}
                onChange={(e) => handleChange('address.state', e.target.value)}
                error={!!errors['address.state']}
                helperText={errors['address.state']}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="ZIP Code"
                value={formData.address.zipCode}
                onChange={(e) => handleChange('address.zipCode', e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Country"
                value={formData.address.country}
                onChange={(e) => handleChange('address.country', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) => handleChange('contactInfo.email', e.target.value)}
                error={!!errors['contactInfo.email']}
                helperText={errors['contactInfo.email']}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.contactInfo.phone}
                onChange={(e) => handleChange('contactInfo.phone', e.target.value)}
                error={!!errors['contactInfo.phone']}
                helperText={errors['contactInfo.phone']}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Website"
                value={formData.contactInfo.website}
                onChange={(e) => handleChange('contactInfo.website', e.target.value)}
                helperText="Company website URL"
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                License Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="RERA Number"
                value={formData.licenseInfo.reraNumber}
                onChange={(e) => handleChange('licenseInfo.reraNumber', e.target.value)}
                helperText="Real Estate Regulatory Authority number"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="RERA State"
                value={formData.licenseInfo.reraState}
                onChange={(e) => handleChange('licenseInfo.reraState', e.target.value)}
                helperText="State where RERA is registered"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="License Expiry Date"
                  value={formData.licenseInfo.expiryDate}
                  onChange={(date) => handleChange('licenseInfo.expiryDate', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      helperText: 'License expiry date'
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Settings & Configuration
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                  />
                }
                label="Company Active"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Subscription Plan"
                value={formData.subscription.plan}
                onChange={(e) => handleChange('subscription.plan', e.target.value)}
              >
                {subscriptionPlans.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Lead Distribution Mode"
                value={formData.settings.leadDistributionMode}
                onChange={(e) => handleChange('settings.leadDistributionMode', e.target.value)}
              >
                <MenuItem value="shared">Shared</MenuItem>
                <MenuItem value="exclusive">Exclusive</MenuItem>
                <MenuItem value="mixed">Mixed</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Max Brokers Per Lead"
                type="number"
                value={formData.settings.maxBrokersPerLead}
                onChange={(e) => handleChange('settings.maxBrokersPerLead', parseInt(e.target.value))}
                inputProps={{ min: 1, max: 5 }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Shared Lead Price (₹)"
                type="number"
                value={formData.settings.leadPricing.sharedPrice}
                onChange={(e) => handleChange('settings.leadPricing.sharedPrice', parseInt(e.target.value))}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Exclusive Lead Price (₹)"
                type="number"
                value={formData.settings.leadPricing.exclusivePrice}
                onChange={(e) => handleChange('settings.leadPricing.exclusivePrice', parseInt(e.target.value))}
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {company ? 'Edit Company' : 'Add New Company'}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ width: '100%', mt: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Paper sx={{ p: 3, mt: 3 }}>
            {renderStepContent(activeStep)}
          </Paper>
          
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Please fix the errors above before proceeding.
            </Alert>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        
        <Box sx={{ flex: '1 1 auto' }} />
        
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleSubmit} variant="contained">
            {company ? 'Update Company' : 'Create Company'}
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained">
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CompanyForm;
