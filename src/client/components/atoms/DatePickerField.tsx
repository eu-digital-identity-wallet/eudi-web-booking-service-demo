import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';

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
      value={value ? dayjs(value) : null} 
      onChange={(newValue) => {
        if (newValue) {
          onChange(newValue.toDate()); // Convert Dayjs back to Date
        } else {
          onChange(null);
        }
      }}
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
