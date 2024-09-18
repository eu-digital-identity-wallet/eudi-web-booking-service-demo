import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

const CarRentalDetails = () => {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <span role="img" aria-label="car">
          🚗
        </span>
        <Typography variant="h6" fontWeight="bold" sx={{ ml: 1 }}>
          Car rental information
        </Typography>
      </Box>

      {/* Car Image and Information */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
        {/* <Image
          src="https://via.placeholder.com/150"
          alt="Car Image"
          width={128} // Equivalent to w-32
          height={96}  // Equivalent to h-24
          style={{ borderRadius: "8px", objectFit: "cover" }}
        /> */}
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          To continue booking your car rental, you must{" "}
          <Typography
            component="a"
            href="#"
            color="primary"
            sx={{ textDecoration: "underline" }}
          >
            sign your contract
          </Typography>{" "}
          with the rental service electronically.
        </Typography>
      </Box>

      {/* Car Rental Button */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          p: 4,
          textAlign: "center",
          mt: 4,
        }}
      >
        <Button variant="contained" color="secondary" fullWidth sx={{ p: 2, fontWeight: "bold" }}>
          Sign your car rental contract
        </Button>
      </Box>
    </Box>
  );
};

export default CarRentalDetails;
