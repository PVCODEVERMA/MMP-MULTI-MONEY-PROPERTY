// import { toast } from 'react-hot-toast';
// import {
//   CheckCircleIcon,
//   ExclamationTriangleIcon,
//   InformationCircleIcon,
//   XCircleIcon
// } from '@heroicons/react/24/outline';

// // Custom toast notification styles and methods
// export const showSuccessToast = (message = {}) => {
//   return toast.success(message, {
//     duration: 4000,
//     position: 'top-center',
//   });
// };

// export const showErrorToast = (message = {}) => {
//   return toast.error(message, {
//     duration: 5000,
//     position: 'top-center'
//   });
// };

// export const showWarningToast = (message = {}) => {
//   return toast(message, {
//     duration: 4500
//   });
// };

// export const showInfoToast = (message = {}) => {
//   return toast(message, {
//     duration: 4000,
//   });
// };

// // Property-specific notifications
// export const PropertyNotifications = {
//   submitted: () => showSuccessToast(
//     '🏠 Property submitted successfully! We\'ll review it within 24 hours.',
//     { duration: 6000 }
//   ),
  
//   approved: (propertyTitle) => showSuccessToast(
//     `🎉 Great news! "${propertyTitle}" has been approved and is now live!`,
//     { duration: 7000 }
//   ),
  
//   rejected: (propertyTitle, reason) => showErrorToast(
//     `❌ "${propertyTitle}" was rejected. Reason: ${reason}`,
//     { duration: 8000 }
//   ),
  
//   inquiry: (propertyTitle) => showInfoToast(
//     `💬 New inquiry received for "${propertyTitle}"`,
//     { duration: 5000 }
//   ),
  
//   uploadProgress: () => toast.loading(
//     'Uploading property images...',
//     { 
//       position: 'top-center',
//     }
//   )
// };
