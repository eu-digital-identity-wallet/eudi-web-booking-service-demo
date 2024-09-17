/* eslint-disable @next/next/no-img-element */
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex gap-2 justify-center p-2 my-auto text-2xl font-bold bg-secondary rounded-lg text-foreground text-opacity-90">
      <img
        loading="lazy"
        width={12}
        height={12}
        src="/images/logo.svg"
        className="shrink-0 w-6 aspect-square"
        alt=""
      />
      <div className="my-auto">
        <span className="text-foreground">Travel</span>
        <span className="font-light text-foreground">Book</span>
      </div>
    </div>
  );
};

export default Logo;
