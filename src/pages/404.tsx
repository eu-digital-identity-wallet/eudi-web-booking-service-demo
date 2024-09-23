import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const Custom404 = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/'); // Redirect to the homepage
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleBackToHome}>
        Back to Home
      </Button>
    </Box>
  );
};

export default Custom404;
