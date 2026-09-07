export const getAuthToken = () => localStorage.getItem('adminToken');
export const setAuthToken = (token: string) => localStorage.setItem('adminToken', token);
export const clearAuthToken = () => localStorage.removeItem('adminToken');

const API_BASE = '/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Remove Content-Type if FormData is used
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        clearAuthToken();
        window.location.href = '/admin/login';
      }
    }
    throw new Error(data.message || 'API Error');
  }

  return data;
}
