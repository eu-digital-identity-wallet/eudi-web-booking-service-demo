/**
 * This code was generated by Builder.io.
 */
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";
import Modal from "./Modal";

const TravelBook: React.FC = () => {
  return (
    <div className="flex flex-col pb-10 bg-white">
      <Modal />

      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default TravelBook;
