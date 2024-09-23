import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

interface IconProps extends SvgIconProps {
  className?: string;
}

const PlusIcon: React.FC<IconProps> = ({ className, ...props }) => {
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
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
};

export default PlusIcon;
