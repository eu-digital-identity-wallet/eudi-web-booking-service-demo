import React from "react";
import { Hotel } from "@/shared";
import { Box, Typography, IconButton } from "@mui/material";
import HeartIcon from "../atoms/HeartIcon";
import PinIcon from "../atoms/PinIcon";
import PlusIcon from "../atoms/PlusIcon";
import ShareIcon from "../atoms/ShareIcon";
import StarIcon from "../atoms/StarIcon";
import TagIcon from "../atoms/TagIcon";
import ThumbUpIcon from "../atoms/ThumbUpIcon";

export default function HotelLocation() {
  return (
    <Box sx={{ pt: 2, pb:2}}>
      {/* Ratings and actions section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {/* Left section with stars and icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {[...Array(5)].map((_, index) => (
              <StarIcon key={index} sx={{ fontSize: 24, color: "secondary.main" }} />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "secondary.main",
              color: "background.paper",
              fontSize: "0.875rem",
              fontWeight: "bold",
              px: 1.5,
              py: 0.5,
              borderRadius: "0.5rem",
            }}
          >
            <ThumbUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <PlusIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>

        {/* Right section with icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <HeartIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <IconButton>
            <ShareIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TagIcon sx={{ color: "primary.main" }} />
            <Typography sx={{ color: "primary.main", fontWeight: "bold" }}>
              We Price Match
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Hotel name */}
      <Typography variant="h4" fontWeight="bold" sx={{ color: "text.primary", mt: 1 }}>
        {Hotel.name}
      </Typography>

      {/* Location section */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <PinIcon sx={{ fontSize: 32, color: "primary.main" }} />
        <Typography sx={{ color: "text.primary", fontWeight: "bold", ml: 1 }}>
          {Hotel.location}
        </Typography>
      </Box>

      {/* Link to show map */}
      <Typography
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          textDecoration: "underline",
          mt: 1,
          cursor: "pointer",
        }}
      >
        Great location - show map
      </Typography>
    </Box>
  );
}