import { Paper, Stack, Typography } from '@mui/material';

export default function ContactInfoCard({ icon: Icon, title, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid rgba(0,0,0,0.06)',
        backgroundColor: '#ffffff',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        {Icon && (
          <Icon
            sx={{
              mt: 0.5,
              fontSize: 26,
              color: '#5c6bc0', // se quiser, muda para a cor principal do ToyTopia
            }}
          />
        )}

        <Stack spacing={0.5}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)' }}>
            {children}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
