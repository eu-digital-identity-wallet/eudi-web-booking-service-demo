// InputField.tsx
import { TextField } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";  // Import this type


interface InputFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  type?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, register, error, type = "text" }) => {
  return (
    <TextField
      {...register}
      type={type}
      label={label}
      error={!!error}
      helperText={error || ''}
      fullWidth
    />
  );
};
