import React from 'react';
import { AppBar, Toolbar, Box, Container } from '@mui/material';
import Logo from "../atoms/Logo";
import Navigation from "@/client/components/molecules/Navigation";

const Header: React.FC = () => {
  return (
    <div>
      <AppBar position="static" color="primary" sx={{ width: '100%', maxWidth:'100%'}} >
        <Box sx={{width: '100%', maxWidth:'100%',pb:2,pt:2}}>
          <Toolbar
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 0,
              flexWrap: { xs: 'wrap', md: 'nowrap' }, // Responsive wrapping
              
            }}
          >
            <Logo />
            <Navigation />
          </Toolbar>
        </Box>
      </AppBar>

      <Box
        component="img"
        loading="lazy"
        src="/images/design.png"
        alt="Travel destination"
        sx={{
          width: '100%',
          aspectRatio: '12.5', 
          maxWidth: '100%',
        }}
      />
    </div>
  );
};

export default Header;
