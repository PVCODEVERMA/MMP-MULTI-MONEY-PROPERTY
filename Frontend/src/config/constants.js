
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const UPLOADS_BASE_URL = import.meta.env.VITE_UPLOADS_URL || 'http://localhost:5000/uploads';
export const NODE_ENV = import.meta.env.VITE_NODE_ENV || import.meta.env.MODE || 'development';

// Helper functions
export const getAvatarUrl = (avatarPath) => {
  if (!avatarPath) return null;
  if (avatarPath.startsWith('http')) return avatarPath;
  return `${UPLOADS_BASE_URL}/${avatarPath}`;
};

export const getFileUrl = (filePath) => {
  if (!filePath) return null;
  if (filePath.startsWith('http')) return filePath;
  return `${UPLOADS_BASE_URL}/${filePath}`;
};

export const isDevelopment = NODE_ENV === 'development';
export const isProduction = NODE_ENV === 'production';

export default {
  API_BASE_URL,
  UPLOADS_BASE_URL,
  NODE_ENV,
  getAvatarUrl,
  getFileUrl,
  isDevelopment,
  isProduction
};
