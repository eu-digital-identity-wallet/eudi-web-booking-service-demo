import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Image from "next/image";

interface NavItem {
  icon: string;
  text: string;
}

const Navigation: React.FC = () => {
  const navItems: NavItem[] = [
    {
      icon: "/images/Accommodation.svg",
      text: "Accommodation",
    },
    {
      icon: "/images/Flights.svg",
      text: "Flights",
    },
    {
      icon: "/images/car-rentals.svg",
      text: "Car Rentals",
    },
    {
      icon: "/images/Sightseeing.svg",
      text: "Sightseeing",
    },
    {
      icon: "/images/Transportation.svg",
      text: "Transportation",
    },
  ];

  return (
    <nav>
      {/* Upper section with icons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        <IconButton>
          <Image
            src="/images/search-white.svg"
            width={24}
            height={24}
            alt="Search"
          />
        </IconButton>
        <IconButton>
          <Image src="/images/globe.svg" width={24} height={24} alt="Globe" />
        </IconButton>
        <IconButton>
          <Image
            src="/images/questions.svg"
            width={24}
            height={24}
            alt="Questions"
          />
        </IconButton>
        <IconButton>
          <Image src="/images/bell.svg" width={24} height={24} alt="Notifications" />
        </IconButton>

        <Box display="flex" gap={1} alignItems="center">
          <Image
            src="/images/user.svg"
            width={24}
            height={24}
            alt="User"
            className="shrink-0"
          />
          <Typography variant="body2">Jane Doe</Typography>
        </Box>
      </Box>

      {/* Lower section with navigation links */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          mt: 2,
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {navItems.map((item, index) => (
          <Box key={index} display="flex" gap={1} alignItems="center">
            <Image
              src={item.icon}
              width={24}
              height={24}
              alt={item.text}
              className="shrink-0"
            />
            <Typography variant="body2">{item.text}</Typography>
          </Box>
        ))}
      </Box>
    </nav>
  );
};

export default Navigation;
