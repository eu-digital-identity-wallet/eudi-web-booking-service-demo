import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import React from 'react';

interface DatePickerFieldProps {
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  error?: string;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, value, onChange, error }) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      sx={{minWidth:'240px',width:'100%'}}
      slotProps={{
        textField: {
          error: !!error,
          helperText: error || '',
        }
      }}
    />
  );
};
