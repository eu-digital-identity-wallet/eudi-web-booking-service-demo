import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

interface IconProps extends SvgIconProps {
  className?: string;
}

const ShareIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <SvgIcon
      {...props}
      className={className}
      viewBox="0 0 24 24"
      sx={{
        fontSize: 24, // Default size equivalent to "size-6" in Tailwind
        ...(props.sx || {}), // Allow custom sx prop to override styles
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        fill="none"
        stroke="currentColor"
        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
      />
    </SvgIcon>
  );
};

export default ShareIcon;
