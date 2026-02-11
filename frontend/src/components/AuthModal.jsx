import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, register } = useAuth();

  // Sync mode when parent changes
  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  // Prefill only for login mode
  useEffect(() => {
    if (!isOpen) return;

    const savedUsername = localStorage.getItem('auth_saved_username') || '';
    const savedPassword = localStorage.getItem('auth_saved_password') || '';
    const savedRemember = localStorage.getItem('auth_saved_remember') === 'true';

    if (isLogin) {
      setUsername(savedUsername);
      setPassword(savedRemember ? savedPassword : '');
      setRememberMe(savedRemember);
    } else {
      // In signup mode we start clean
      setUsername('');
      setPassword('');
      setRememberMe(false);
    }

    // Email is not auto-filled for signup/login anymore
    setEmail('');
  }, [isOpen, isLogin]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (isLogin) {
      result = await login(username, password);
    } else {
      result = await register(username, email, password);
    }

    setLoading(false);

    if (result.success) {
      // Persist creds only for login when remember is checked
      if (isLogin && rememberMe) {
        localStorage.setItem('auth_saved_username', username);
        localStorage.setItem('auth_saved_password', password);
        localStorage.setItem('auth_saved_remember', 'true');
      } else {
        localStorage.removeItem('auth_saved_username');
        localStorage.removeItem('auth_saved_password');
        localStorage.removeItem('auth_saved_remember');
      }

      onClose();
      // Reset form
      if (isLogin && rememberMe) {
        setUsername(username);
        setPassword(password);
      } else {
        setUsername('');
        setPassword('');
      }
      setEmail('');
    } else {
      setError(result.error);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    // Clear fields when switching modes to avoid showing saved login on signup
    setUsername('');
    setPassword('');
    setEmail('');
    setRememberMe(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full m-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all"
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all"
                required
              />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all"
              required
              minLength="6"
            />
            {!isLogin && (
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        {isLogin && (
          <div className="flex items-center gap-2 mt-4">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-red-600 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">
              Keep me signed in please!
            </label>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={switchMode}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
