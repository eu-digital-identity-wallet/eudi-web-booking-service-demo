import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo: React.FC = () => {
  return (
    <Box
      component={Link}
      href="/"
      display="flex"
      justifyContent="center"
      alignItems="center"
      pl={1}
      pr={2}
      gap={1}
      bgcolor="secondary.main"
      borderRadius={1}
      sx={{ cursor: "pointer", textDecoration: "none" }}
    >
      <Image
        src="/images/logo.svg"
        alt="TravelBook logo"
        width={24}
        height={24}
        className="shrink-0"
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="left"
        className="my-auto"
      >
        <Typography variant="h6" component="span" color="textPrimary">
          TravelBook
        </Typography>
      </Box>
    </Box>
  );
};

export default Logo;
