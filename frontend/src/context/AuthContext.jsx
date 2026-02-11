import React, { createContext, useContext, useState, useEffect } from 'react';

// Use relative /api so it works in dev (Vite proxy) and Docker (nginx proxy)
const API_BASE_URL = '/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current user using session cookie (if present)
    fetch(`${API_BASE_URL}/auth/me`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.data);
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to login' };
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to register' };
    }
  };

  const logout = () => {
    fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).finally(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
