/**
 * This code was generated by Builder.io.
 */
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex gap-2 justify-center p-2 my-auto text-2xl font-bold bg-yellow-500 rounded-lg text-black text-opacity-90">
      <img
        loading="lazy"
        src="images/logo.svg"
        className="shrink-0 w-6 aspect-square"
        alt=""
      />
      <div className="my-auto">
        <span className="text-black">Travel</span>
        <span className="font-light text-black">Book</span>
      </div>
    </div>
  );
};

export default Logo;
