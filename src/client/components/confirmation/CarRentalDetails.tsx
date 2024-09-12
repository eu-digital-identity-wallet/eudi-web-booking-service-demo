const CarRentalDetails = () => {
  return (
    <div className=''>
      {/* header */}
      <div className='p-2 flex'>
        🚗
        <h2 className='font-bold text-black text-xl'>Car rental information</h2>
      </div>
      <div className=''>
        <img
          src='https://via.placeholder.com/150'
          alt='Car Image'
          className='w-32 h-24 object-cover rounded-md'
        />
        <span className='text-black font-bold text-sm'>
          To continue booking your car rental, you must{" "}
          <a href='#' className='text-sky-600 underline'>
            sign your contract
          </a>{" "}
          with the rental service electronically.
        </span>
      </div>

      {/* Car Rental Button */}
      <div className='bg-sky-600 text-white p-4 text-center mt-4'>
        <button className='w-full p-2 font-bold'>
          Sign your car rental contract
        </button>
      </div>
    </div>
  );
};

export default CarRentalDetails;
