/**
 * This code was generated by Builder.io.
 */
import useAppStore, { ModalStatus } from "@/client/store/appStore";
import React from "react";
import BookingForm from "./BookingForm";
import HotelDescription from "./HotelDescription";
import Modal from "./Modal";
import Sidebar from "./Sidebar";

const BookingCreate: React.FC = () => {
  const { modal } = useAppStore();

  return (
    <main className="max-w-[1240px] max-md:max-w-full mx-auto">
      {modal === ModalStatus.OPEN && <Modal />}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.981 1.421 8.304-7.357-3.872-7.357 3.872 1.421-8.304-6.064-5.981 8.332-1.151z" />
                </svg>
              ))}
            </div>
            <div className="bg-yellow-400 text-white text-sm font-bold px-1.5 py-0.5 rounded-md flex items-center">
              <span>👍🏻 +</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-2 text-accent-foreground">
            Utopia Hotel
          </h1>
          <div className="flex items-center text-blue-600 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16.88 3.549a6.5 6.5 0 00-9.76 8.451L12 21l4.35-8.999A6.5 6.5 0 0016.88 3.55z"
              />
            </svg>
            <span>
              25 Boulevard du Souverain, Watermaal-Bosvoorde /
              Watermael-Boitsfort, 1170 Brussels, Belgium
            </span>
          </div>
          <a href="#" className="text-blue-600 underline mt-1 block">
            Great location - show map
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            Check available dates
          </button>
          <div className="flex items-center text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.5v15m7-7.5H5"
              />
            </svg>
            <span>We Price Match</span>
          </div>
        </div>
      </div>
      <div className="self-center px-5 mt-8 w-full max-w-[1239px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <BookingForm />
          <HotelDescription />
          <Sidebar />
        </div>
      </div>
    </main>
  );
};

export default BookingCreate;
