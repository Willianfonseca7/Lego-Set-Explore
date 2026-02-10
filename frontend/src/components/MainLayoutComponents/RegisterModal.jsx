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

export default function RegisterModal({ open, onClose, onSwitchToLogin }) {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language].auth;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Implement actual registration logic
    if (formData.password !== formData.confirmPassword) {
      alert(t.passwordMismatch);
      return;
    }
    console.log('Register:', formData);
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
          {t.signUp}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label={t.fullName}
            value={formData.name}
            onChange={handleChange('name')}
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
            label={t.email}
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
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
            value={formData.password}
            onChange={handleChange('password')}
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

          <TextField
            fullWidth
            label={t.confirmPassword}
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            required
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    sx={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
                  >
                    {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
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
            {t.signUp}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography
              variant="body2"
              sx={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
            >
              {t.alreadyHaveAccount}{' '}
              <Button
                onClick={onSwitchToLogin}
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
                {t.signIn}
              </Button>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
