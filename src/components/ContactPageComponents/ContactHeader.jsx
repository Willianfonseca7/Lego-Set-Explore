import { Box, Container } from '@mui/material';

export default function ContactHeader() {
  return (
    <Box
      sx={{
        background:
          'linear-gradient(135deg, #ffe6e9 0%, #fff6e9 8%, #fff7d9 35%, #e3ffe4 70%, #e8e5ff 100%)',
        pt: { xs: 8, md: 10 },
        pb: { xs: 6, md: 8 },
        mb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <h1 className="h3-style" style={{ textAlign: 'center', letterSpacing: '0.08em', marginBottom: '0.25rem', color: '#111827' }}>
          Kontaktiere uns
        </h1>

        <p className="p-style-small" style={{ textAlign: 'center', color: 'rgba(0,0,0,0.7)', maxWidth: '520px' }}>
          Wie können wir helfen? Schreib uns einfach eine Nachricht zu deiner
          Bestellung, Lieferung oder zu unseren Spielsachen.
        </p>
      </Container>
    </Box>
  );
}
