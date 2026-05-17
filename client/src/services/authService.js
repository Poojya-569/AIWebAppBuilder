import api from './api.js';

export const registerUser = async ({ name, email, password }) => {
  const response = await api.post('/auth/register', { name, email, password });
  console.log('[auth/register] API response:', response.data);
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password });
  console.log('[auth/login] API response:', response.data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  console.log('[auth/me] API response:', response.data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

// Backward-compatible aliases used by existing UI imports.
export const register = async (name, email, password) => registerUser({ name, email, password });
export const emailLogin = async (email, password) => loginUser({ email, password });
export const logout = logoutUser;