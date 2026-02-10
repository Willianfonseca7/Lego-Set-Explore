import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, Box } from '@mui/material';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1400,
          width: '100%',
          maxWidth: '1200px',
          px: 2,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'flex-end',
          '@media (min-width: 1200px)': {
            px: 3,
          },
        }}
      >
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={handleClose}
          sx={{ 
            pointerEvents: 'auto',
            position: 'relative',
            bottom: 0,
            right: 0,
          }}
        >
          <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%', maxWidth: '400px' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
};

export default NotificationContext;

