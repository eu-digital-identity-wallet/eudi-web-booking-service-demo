/**
 * This code was generated by Builder.io.
 */
import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";

const Header: React.FC = () => {
  return (
    <div>
      <header className="flex gap-5 justify-between px-12 py-6 w-full bg-primary max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <Logo />
        <Navigation />
      </header>
      <img
        loading="lazy"
        src="/images/design.png"
        className="w-full aspect-[12.5] max-md:max-w-full"
        alt="Travel destination"
      />
    </div>
  );
};

export default Header;
