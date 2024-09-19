import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

const Sidebar: React.FC = () => {
  return (
    <Box
      component="aside"
      sx={{
        display: "flex",
        flexDirection: "column",
        ml: { md: 5, xs: 0 },
        mt: { xs: 10, md: 0 },
        width: { xs: "100%", md: "auto" },
      }}
    >
      <Image
        loading="lazy"
        src="/images/sidebar.png"
        alt="reviews"
        width={259}
        height={454} // Aspect ratio of 0.57 (259px width * 0.57 = 147px height)
        style={{
          width: "100%",
          height: "auto",
          minWidth:'280px'
        }}
      />
    </Box>
  );
};

export default Sidebar;
