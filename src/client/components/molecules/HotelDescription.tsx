import React from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
 
import { Hotel } from "@/shared";

const HotelDescription: React.FC = () => {

  return (
   
      <Box sx={{ textAlign: 'left', fontSize: '0.875rem' }}>
        <Typography color="textPrimary">
          {Hotel.name} Hotel has a garden, terrace, a restaurant, and bar in
          Brussels. With free WiFi, this 4-star hotel offers room service and a
          24-hour front desk. There is a spa and wellness centre with an outdoor
          swimming pool, indoor pool, and fitness centre, as well as a sauna.
          <br />
          <br />
          The hotel will provide guests with air-conditioned rooms offering a
          desk, a kettle, a fridge, a safety deposit box, a flat-screen TV, and a
          private bathroom with a shower. Some rooms include a kitchenette with
          a dishwasher, an oven, and a microwave. At {Hotel.name} Hotel, rooms
          come with bed linen and towels.
          <br />
          <br />
          The accommodation offers a buffet or continental breakfast. The
          wellness area at {Hotel.name} Hotel includes a hot tub and a hammam.
          <br />
          <br />
        </Typography>
      </Box>

     
  );
};

export default HotelDescription;