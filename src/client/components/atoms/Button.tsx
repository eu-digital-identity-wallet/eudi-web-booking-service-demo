import { Button as MuiButton } from '@mui/material';
import React from 'react';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
};

export const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'contained' }) => (
  <MuiButton variant={variant} onClick={onClick}>
    {text}
  </MuiButton>
);
