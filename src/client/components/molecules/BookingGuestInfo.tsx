import { Box } from "@mui/material";
import { InputField } from "../atoms/InputField";
import { DatePickerField } from "../atoms/DatePickerField";
import { CheckboxField } from "../atoms/CheckboxField";
import { Controller, useFormContext } from "react-hook-form";
import React from "react";

export const BookingGuestInfo: React.FC = () => {
  const { register, control, formState: { errors } } = useFormContext();

  return (
    <Box>
      <Box mb={2}>
        <InputField
          label="Number of Guests *"
          register={register("numberOfGuests", { valueAsNumber: true })}
          error={errors.numberOfGuests?.message as string | undefined}  // Safely extract the message as string
        />
      </Box>

      <Box mb={2}>
        <InputField
          label="Number of Rooms *"
          register={register("numberOfRooms", { valueAsNumber: true })}
          error={errors.numberOfRooms?.message as string | undefined}  // Safely extract the message as string
          />
      </Box>

      <Box mb={2}>
        <Controller
          name="checkIn"
          control={control}
          render={({ field }) => (
            <DatePickerField
              label="Check-in Date *"
              value={field.value ? new Date(field.value ) : null}
              onChange={(date) => field.onChange((date) ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString() : '' )}
              error={errors.checkIn?.message as string | undefined}
            />
          )}
        />
      </Box>

      <Box mb={2}>
        <Controller
          name="checkOut"
          control={control}
          render={({ field }) => (
            <DatePickerField
              label="Check-out Date *"
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => field.onChange( (date) ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString() : '')}
              error={errors.checkOut?.message as string | undefined}
            />
          )}
        />
      </Box>

      <Box mb={2}>
        <CheckboxField label="Car Rental" register={register("carRental")} />
      </Box>
      <input type="hidden" {...register("hotel")} />
      <input type="hidden" {...register("location")} />
    </Box>
  );
};
