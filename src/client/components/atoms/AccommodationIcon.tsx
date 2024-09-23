import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

interface IconProps extends SvgIconProps {
  className?: string;
}

const AccommodationIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <SvgIcon
      {...props}
      className={className}
      viewBox="0 0 24 24"
      sx={{
        fontSize: 24,
        ...(props.sx || {}), // Allow custom sx prop to override styles
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 10.78V8C21 6.35 19.65 5 18 5H14C13.23 5 12.53 5.3 12 5.78C11.47 5.3 10.77 5 10 5H6C4.35 5 3 6.35 3 8V10.78C2.39 11.33 2 12.12 2 13V19H4V17H20V19H22V13C22 12.12 21.61 11.33 21 10.78ZM14 7H18C18.55 7 19 7.45 19 8V10H13V8C13 7.45 13.45 7 14 7ZM5 8C5 7.45 5.45 7 6 7H10C10.55 7 11 7.45 11 8V10H5V8ZM4 15V13C4 12.45 4.45 12 5 12H19C19.55 12 20 12.45 20 13V15H4Z"
          fill={"black"}
        />
      </svg>
    </SvgIcon>
  );
};

export default AccommodationIcon;
