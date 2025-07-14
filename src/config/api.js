// API Configuration for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const API_ENDPOINTS = {
  assessment: `${API_BASE_URL}/api/assessment`
};

export default API_ENDPOINTS; 