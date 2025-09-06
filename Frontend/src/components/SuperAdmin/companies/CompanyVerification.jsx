
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
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Alert,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Divider,
  Badge,
  CircularProgress
} from '@mui/material';
import {
  Business,
  CheckCircle,
  Cancel,
  Warning,
  Description,
  Phone,
  Email,
  LocationOn,
  Language,
  CloudDownload,
  Visibility,
  AccountBalance,
  Gavel,
  Security,
  ExpandMore,
  Close,
  Save,
  Send,
  History,
  Comment,
  AttachFile,
  VerifiedUser,
  ErrorOutline,
  InfoOutline
} from '@mui/icons-material';
// import { useCompanyApi } from '../../../hooks/useCompanyApi';

const verificationSteps = [
  {
    id: 'basic_info',
    label: 'Basic Information',
    description: 'Verify company details and contact information'
  },
  {
    id: 'documents',
    label: 'Legal Documents',
    description: 'Review registration and legal documents'
  },
  {
    id: 'rera_license',
    label: 'RERA License',
    description: 'Verify RERA registration and compliance'
  },
  {
    id: 'address_verification',
    label: 'Address Verification',
    description: 'Confirm business address and location'
  },
  {
    id: 'final_review',
    label: 'Final Review',
    description: 'Complete verification and approval'
  }
];

const verificationStatuses = {
  pending: { color: 'warning', icon: <Warning />, label: 'Pending Review' },
  approved: { color: 'success', icon: <CheckCircle />, label: 'Approved' },
  rejected: { color: 'error', icon: <Cancel />, label: 'Rejected' },
  requires_info: { color: 'info', icon: <InfoOutline />, label: 'Requires Information' }
};

const DocumentViewer = ({ document, onStatusChange }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={2}>
          <Description color="primary" />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {document.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {document.type} • {document.size} • Uploaded {new Date(document.uploadedAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" gap={1}>
          <Tooltip title="View Document">
            <IconButton onClick={() => window.open(document.url, '_blank')}>
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton onClick={() => window.open(document.url, '_blank')}>
              <CloudDownload />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <FormControl component="fieldset">
        <FormLabel component="legend" sx={{ fontSize: '0.875rem', mb: 1 }}>
          Document Status
        </FormLabel>
        <RadioGroup
          row
          value={document.status || 'pending'}
          onChange={(e) => onStatusChange(document.id, e.target.value)}
        >
          <FormControlLabel value="approved" control={<Radio />} label="Approved" />
          <FormControlLabel value="rejected" control={<Radio />} label="Rejected" />
          <FormControlLabel value="requires_info" control={<Radio />} label="Requires Info" />
        </RadioGroup>
      </FormControl>

      <TextField
        fullWidth
        multiline
        rows={2}
        placeholder="Add comments about this document..."
        value={document.comments || ''}
        onChange={(e) => onStatusChange(document.id, document.status, e.target.value)}
        sx={{ mt: 2 }}
        size="small"
      />
    </CardContent>
  </Card>
);

const VerificationStepContent = ({ step, company, verificationData, onUpdate }) => {
  const stepData = verificationData[step.id] || {};

  switch (step.id) {
    case 'basic_info':
      return (
        <Box>
          <Typography variant="h6" gutterBottom>
            Company Basic Information Verification
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Company Details
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Business /></ListItemIcon>
                      <ListItemText
                        primary={company.name}
                        secondary="Company Name"
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          size="small"
                          label={stepData.name_verified ? 'Verified' : 'Pending'}
                          color={stepData.name_verified ? 'success' : 'warning'}
                          icon={stepData.name_verified ? <CheckCircle /> : <Warning />}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon><AccountBalance /></ListItemIcon>
                      <ListItemText
                        primary={company.businessType?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        secondary="Business Type"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Contact Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Email /></ListItemIcon>
                      <ListItemText
                        primary={company.contactInfo?.email}
                        secondary="Email Address"
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          size="small"
                          label={stepData.email_verified ? 'Verified' : 'Pending'}
                          color={stepData.email_verified ? 'success' : 'warning'}
                          icon={stepData.email_verified ? <CheckCircle /> : <Warning />}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon><Phone /></ListItemIcon>
                      <ListItemText
                        primary={company.contactInfo?.phone}
                        secondary="Phone Number"
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          size="small"
                          label={stepData.phone_verified ? 'Verified' : 'Pending'}
                          color={stepData.phone_verified ? 'success' : 'warning'}
                          icon={stepData.phone_verified ? <CheckCircle /> : <Warning />}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    {company.contactInfo?.website && (
                      <ListItem>
                        <ListItemIcon><Language /></ListItemIcon>
                        <ListItemText
                          primary={company.contactInfo.website}
                          secondary="Website"
                        />
                      </ListItem>
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box mt={3}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Verification Notes"
              placeholder="Add your verification notes for basic information..."
              value={stepData.notes || ''}
              onChange={(e) => onUpdate(step.id, { ...stepData, notes: e.target.value })}
            />
          </Box>

          <Box mt={3}>
            <FormControl>
              <FormLabel>Basic Information Status</FormLabel>
              <RadioGroup
                row
                value={stepData.status || 'pending'}
                onChange={(e) => onUpdate(step.id, { ...stepData, status: e.target.value })}
              >
                <FormControlLabel value="approved" control={<Radio />} label="Approved" />
                <FormControlLabel value="rejected" control={<Radio />} label="Rejected" />
                <FormControlLabel value="requires_info" control={<Radio />} label="Requires Additional Information" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      );

    case 'documents':
      const documents = [
        {
          id: 'incorporation',
          name: 'Certificate of Incorporation',
          type: 'PDF',
          size: '2.5 MB',
          uploadedAt: new Date(),
          url: '#',
          status: stepData.incorporation_status || 'pending'
        },
        {
          id: 'pan',
          name: 'Company PAN Card',
          type: 'PDF',
          size: '1.2 MB',
          uploadedAt: new Date(),
          url: '#',
          status: stepData.pan_status || 'pending'
        },
        {
          id: 'gst',
          name: 'GST Registration Certificate',
          type: 'PDF',
          size: '1.8 MB',
          uploadedAt: new Date(),
          url: '#',
          status: stepData.gst_status || 'pending'
        }
      ];

      return (
        <Box>
          <Typography variant="h6" gutterBottom>
            Legal Documents Verification
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            Please review all uploaded documents carefully. Verify the authenticity and validity of each document.
          </Alert>

          {documents.map((doc) => (
            <DocumentViewer
              key={doc.id}
              document={doc}
              onStatusChange={(docId, status, comments) => {
                onUpdate(step.id, {
                  ...stepData,
                  [`${docId}_status`]: status,
                  [`${docId}_comments`]: comments
                });
              }}
            />
          ))}

          <Box mt={3}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Overall Documents Review"
              placeholder="Provide overall assessment of submitted documents..."
              value={stepData.overall_notes || ''}
              onChange={(e) => onUpdate(step.id, { ...stepData, overall_notes: e.target.value })}
            />
          </Box>
        </Box>
      );

    case 'rera_license':
      return (
        <Box>
          <Typography variant="h6" gutterBottom>
            RERA License Verification
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    RERA Registration Details
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={company.licenseInfo?.reraNumber || 'Not Provided'}
                        secondary="RERA Registration Number"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={company.licenseInfo?.reraState || 'Not Provided'}
                        secondary="RERA State"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={company.licenseInfo?.expiryDate 
                          ? new Date(company.licenseInfo.expiryDate).toLocaleDateString()
                          : 'Not Provided'}
                        secondary="License Expiry Date"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Verification Actions
                  </Typography>
                  
                  <Box mb={2}>
                    <Button
                      variant="outlined"
                      startIcon={<Security />}
                      fullWidth
                      onClick={() => {
                        // Open RERA verification portal
                        const reraNumber = company.licenseInfo?.reraNumber;
                        const state = company.licenseInfo?.reraState;
                        if (reraNumber && state) {
                          window.open(`https://${state.toLowerCase()}rera.in/verify/${reraNumber}`, '_blank');
                        }
                      }}
                    >
                      Verify on RERA Portal
                    </Button>
                  </Box>

                  <FormControl fullWidth>
                    <FormLabel>RERA Verification Status</FormLabel>
                    <RadioGroup
                      value={stepData.rera_status || 'pending'}
                      onChange={(e) => onUpdate(step.id, { ...stepData, rera_status: e.target.value })}
                    >
                      <FormControlLabel value="valid" control={<Radio />} label="Valid & Active" />
                      <FormControlLabel value="expired" control={<Radio />} label="Expired" />
                      <FormControlLabel value="invalid" control={<Radio />} label="Invalid/Not Found" />
                      <FormControlLabel value="pending" control={<Radio />} label="Pending Verification" />
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box mt={3}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="RERA Verification Notes"
              placeholder="Add notes about RERA license verification..."
              value={stepData.rera_notes || ''}
              onChange={(e) => onUpdate(step.id, { ...stepData, rera_notes: e.target.value })}
            />
          </Box>
        </Box>
      );

    case 'address_verification':
      return (
        <Box>
          <Typography variant="h6" gutterBottom>
            Address Verification
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Registered Address
                  </Typography>
                  <Box mb={2}>
                    <Typography variant="body2" color="textSecondary">
                      {company.address?.street}
                    </Typography>
                    <Typography variant="body2">
                      {company.address?.city}, {company.address?.state} - {company.address?.zipCode}
                    </Typography>
                    <Typography variant="body2">
                      {company.address?.country}
                    </Typography>
                  </Box>

                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      startIcon={<LocationOn />}
                      onClick={() => {
                        const address = `${company.address?.street}, ${company.address?.city}, ${company.address?.state}`;
                        window.open(`https://maps.google.com/maps?q=${encodeURIComponent(address)}`, '_blank');
                      }}
                    >
                      View on Google Maps
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Verification Status
                  </Typography>
                  
                  <FormControl fullWidth>
                    <RadioGroup
                      value={stepData.address_status || 'pending'}
                      onChange={(e) => onUpdate(step.id, { ...stepData, address_status: e.target.value })}
                    >
                      <FormControlLabel value="verified" control={<Radio />} label="Address Verified" />
                      <FormControlLabel value="mismatch" control={<Radio />} label="Address Mismatch" />
                      <FormControlLabel value="incomplete" control={<Radio />} label="Incomplete Address" />
                      <FormControlLabel value="pending" control={<Radio />} label="Pending Verification" />
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box mt={3}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Address Verification Notes"
              placeholder="Add notes about address verification..."
              value={stepData.address_notes || ''}
              onChange={(e) => onUpdate(step.id, { ...stepData, address_notes: e.target.value })}
            />
          </Box>
        </Box>
      );

    case 'final_review':
      const allSteps = ['basic_info', 'documents', 'rera_license', 'address_verification'];
      const completedSteps = allSteps.filter(stepId => 
        verificationData[stepId]?.status === 'approved'
      ).length;
      const progress = (completedSteps / allSteps.length) * 100;

      return (
        <Box>
          <Typography variant="h6" gutterBottom>
            Final Verification Review
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Verification Progress
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Box width="100%" mr={1}>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {Math.round(progress)}%
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {completedSteps} of {allSteps.length} verification steps completed
              </Typography>
            </CardContent>
          </Card>

          {/* Verification Summary */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Verification Summary
              </Typography>
              {verificationSteps.slice(0, -1).map((step) => {
                const stepStatus = verificationData[step.id]?.status || 'pending';
                const statusConfig = verificationStatuses[stepStatus];
                
                return (
                  <Box key={step.id} display="flex" alignItems="center" mb={1}>
                    <Chip
                      icon={statusConfig.icon}
                      label={statusConfig.label}
                      color={statusConfig.color}
                      size="small"
                      sx={{ minWidth: 140, mr: 2 }}
                    />
                    <Typography variant="body2">
                      {step.label}
                    </Typography>
                  </Box>
                );
              })}
            </CardContent>
          </Card>

          {/* Final Decision */}
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Final Verification Decision
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <FormLabel>Company Verification Status</FormLabel>
                <RadioGroup
                  value={stepData.final_decision || 'pending'}
                  onChange={(e) => onUpdate(step.id, { ...stepData, final_decision: e.target.value })}
                >
                  <FormControlLabel 
                    value="approved" 
                    control={<Radio />} 
                    label="Approve Company - All verifications passed"
                  />
                  <FormControlLabel 
                    value="rejected" 
                    control={<Radio />} 
                    label="Reject Company - Failed verification requirements"
                  />
                  <FormControlLabel 
                    value="conditional" 
                    control={<Radio />} 
                    label="Conditional Approval - Requires additional documentation"
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Final Review Comments"
                placeholder="Provide detailed comments for the verification decision..."
                value={stepData.final_comments || ''}
                onChange={(e) => onUpdate(step.id, { ...stepData, final_comments: e.target.value })}
                required
              />
            </CardContent>
          </Card>
        </Box>
      );

    default:
      return null;
  }
};

const CompanyVerification = ({ open, company, onClose, onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [verificationData, setVerificationData] = useState({});
  const [loading, setLoading] = useState(false);
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const { verifyCompany, getVerificationHistory } = useCompanyApi();

  useEffect(() => {
    if (open && company) {
      fetchVerificationHistory();
    }
  }, [open, company]);

  const fetchVerificationHistory = async () => {
    try {
      const history = await getVerificationHistory(company._id);
      setVerificationHistory(history.data || []);
    } catch (error) {
      console.error('Failed to fetch verification history:', error);
    }
  };

  const handleStepUpdate = (stepId, data) => {
    setVerificationData(prev => ({
      ...prev,
      [stepId]: data
    }));
  };

  const handleNext = () => {
    if (activeStep < verificationSteps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    try {
      setLoading(true);
      
      const finalDecision = verificationData.final_review?.final_decision;
      const verificationResult = {
        companyId: company._id,
        verificationData,
        decision: finalDecision,
        verifiedBy: 'current_user_id', // Replace with actual user ID
        verificationDate: new Date().toISOString()
      };

      await verifyCompany(company._id, verificationResult);
      onComplete(verificationResult);
      onClose();
    } catch (error) {
      console.error('Failed to complete verification:', error);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    const currentStepData = verificationData[verificationSteps[activeStep].id];
    return currentStepData?.status && currentStepData.status !== 'pending';
  };

  const isLastStep = activeStep === verificationSteps.length - 1;
  const canComplete = verificationData.final_review?.final_decision && 
                     verificationData.final_review?.final_comments;

  if (!company) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xl" 
      fullWidth
      PaperProps={{ sx: { height: '90vh' } }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <VerifiedUser />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Company Verification
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {company.name}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Tabs */}
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Verification Process" />
          <Tab label={`History (${verificationHistory.length})`} />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            {/* Stepper */}
            <Stepper activeStep={activeStep} orientation="vertical">
              {verificationSteps.map((step, index) => {
                const stepStatus = verificationData[step.id]?.status;
                const isCompleted = stepStatus === 'approved';
                const hasError = stepStatus === 'rejected';

                return (
                  <Step key={step.id} completed={isCompleted}>
                    <StepLabel
                      error={hasError}
                      StepIconProps={{
                        sx: {
                          '&.Mui-completed': { color: 'success.main' },
                          '&.Mui-error': { color: 'error.main' }
                        }
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {step.label}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {step.description}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ mb: 2 }}>
                        <VerificationStepContent
                          step={step}
                          company={company}
                          verificationData={verificationData}
                          onUpdate={handleStepUpdate}
                        />
                      </Box>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Verification History
            </Typography>
            {verificationHistory.length === 0 ? (
              <Alert severity="info">
                No previous verification attempts found for this company.
              </Alert>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Verified By</TableCell>
                      <TableCell>Decision</TableCell>
                      <TableCell>Comments</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {verificationHistory.map((record) => (
                      <TableRow key={record._id}>
                        <TableCell>
                          {new Date(record.verificationDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{record.verifiedBy}</TableCell>
                        <TableCell>
                          <Chip
                            label={record.decision}
                            color={record.decision === 'approved' ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                            {record.comments}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
      </DialogContent>

      {activeTab === 0 && (
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          
          <Box flex="1 1 auto" />
          
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          
          {!isLastStep ? (
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={!canProceed()}
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              variant="contained"
              disabled={!canComplete || loading}
              startIcon={loading ? <CircularProgress size={16} /> : <Send />}
            >
              {loading ? 'Processing...' : 'Complete Verification'}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
    
  );
};

export default CompanyVerification;
