import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import CarRentalIcon from "../atoms/CarRentalIcon";
import RightBoxArrowIcon from "../atoms/RightBoxArrowIcon";

export default function CarInformation() {
  const downloadContract = () => {
    // Create a link element, set its href to the PDF file, and trigger the download
    const link = document.createElement("a");
    link.href = "/Car-Rental-Contract.pdf"; // The file path within the public folder
    link.download = "Car-Rental-Contract.pdf"; // The file name for download
    link.click();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        <CarRentalIcon />
        <Typography fontWeight={"bold"}>Car rental information</Typography>
      </Box>

      {/* Car Image and Information */}

      <Image src="/images/car.png" alt="car" width={217} height={145} />
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        To continue booking your car rental, you must{" "}
        <Typography
          component="a"
          color="primary"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
        >
          sign your contract
        </Typography>{" "}
        with the rental service electronically.
      </Typography>

      {/* Car Rental Button */}
      <Box
        sx={{
          color: "white",
          mt: 4,
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={downloadContract}
          startIcon={<RightBoxArrowIcon />}
          sx={{ p: 2, fontWeight: "bold" }}
        >
          Sign your car rental contract
        </Button>
      </Box>
    </Box>
  );
}
