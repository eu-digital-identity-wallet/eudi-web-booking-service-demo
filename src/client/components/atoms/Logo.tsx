import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <Box
      display="flex"
      
      justifyContent="center"
      alignItems="center"
      pl={1}
      pr={2}
      gap={1}
      bgcolor="secondary.main"
      borderRadius={1}
      className="my-auto"
    > 
      <Image
        src="/images/logo.svg"
        alt="TravelBook logo"
        width={24}  // Replace 12px with 24px to scale the image size
        height={24} // Proportional height for square image
        className="shrink-0"
      />
      <Box display="flex" flexDirection="column" alignItems="left" className="my-auto">
        <Typography variant="h6" component="span" color="textPrimary">
          TravelBook
        </Typography>
      </Box>
    </Box>
  );
};

export default Logo;