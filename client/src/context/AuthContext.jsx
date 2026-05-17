import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getMe } from '../services/authService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hydrateUser = async () => {
      const token = Cookies.get('token');
      console.log('[AuthContext] hydrate start, token exists:', Boolean(token));
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const meResponse = await getMe();
        console.log('[AuthContext] hydrate response:', meResponse);
        setUser(meResponse?.data ?? null);
      } catch {
        console.log('[AuthContext] hydrate failed, clearing token');
        Cookies.remove('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    hydrateUser();
  }, []);

  const login = (token, userData) => {
    console.log('[AuthContext] login called:', { hasToken: Boolean(token), userData });
    if (token) {
      Cookies.set('token', token);
    }
    setUser(userData ?? null);
  };

  const logout = () => {
    console.log('[AuthContext] logout called');
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext };