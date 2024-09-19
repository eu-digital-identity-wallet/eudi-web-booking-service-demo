import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface CheckboxFieldProps {
  label: string;
  register: any;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, register }) => (
  <FormControlLabel control={<Checkbox {...register} />} label={label} />
);
