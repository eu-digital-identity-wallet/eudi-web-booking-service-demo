import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

interface IconProps extends SvgIconProps {
  className?: string;
}

const CarImage: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <SvgIcon
      {...props}
      className={className}
      viewBox="0 0 24 24"
      sx={{
        fontSize: 24, // Default size (equivalent to Tailwind size-6)
        ...(props.sx || {}), // Allow custom `sx` prop to override styles
      }}
    ></SvgIcon>
  );
};

export default CarImage;
