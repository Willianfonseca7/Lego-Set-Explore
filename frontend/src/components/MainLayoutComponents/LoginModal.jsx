import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { ThemeContext } from '../../context/ThemeContext';
import { LanguageContext } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

export default function LoginModal({ open, onClose, onSwitchToRegister }) {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language].auth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    console.log('Login:', { email, password });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
          backgroundImage: 'none',
          borderRadius: '12px',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
          color: darkMode ? '#e5e7eb' : '#111827',
        }}
      >
        <Typography variant="h5" component="div" fontWeight={600}>
          {t.signIn}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label={t.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: darkMode ? '#e5e7eb' : '#111827',
                '& fieldset': {
                  borderColor: darkMode ? '#475569' : '#d1d5db',
                },
                '&:hover fieldset': {
                  borderColor: darkMode ? '#64748b' : '#9ca3af',
                },
                '&.Mui-focused fieldset': {
                  borderColor: darkMode ? '#a78bfa' : '#7c3aed',
                },
              },
              '& .MuiInputLabel-root': {
                color: darkMode ? '#9ca3af' : '#6b7280',
              },
            }}
          />

          <TextField
            fullWidth
            label={t.password}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
                  >
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: darkMode ? '#e5e7eb' : '#111827',
                '& fieldset': {
                  borderColor: darkMode ? '#475569' : '#d1d5db',
                },
                '&:hover fieldset': {
                  borderColor: darkMode ? '#64748b' : '#9ca3af',
                },
                '&.Mui-focused fieldset': {
                  borderColor: darkMode ? '#a78bfa' : '#7c3aed',
                },
              },
              '& .MuiInputLabel-root': {
                color: darkMode ? '#9ca3af' : '#6b7280',
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              background: darkMode
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#ffffff',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '8px',
              '&:hover': {
                background: darkMode
                  ? 'linear-gradient(135deg, #5568d3 0%, #6a4190 100%)'
                  : 'linear-gradient(135deg, #5568d3 0%, #6a4190 100%)',
              },
            }}
          >
            {t.signIn}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography
              variant="body2"
              sx={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
            >
              {t.dontHaveAccount}{' '}
              <Button
                onClick={onSwitchToRegister}
                sx={{
                  textTransform: 'none',
                  color: darkMode ? '#a78bfa' : '#7c3aed',
                  fontWeight: 600,
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                {t.signUp}
              </Button>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
