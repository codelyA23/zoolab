const API_URL = '/api';

export const testConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/test-db`);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return { status: 'error', message: 'Failed to connect to backend' };
  }
};
