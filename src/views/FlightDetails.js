import React, { useEffect } from "react";
import { viewBookings } from "../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

const FlightDetails = () => {
  const { loading, values } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewBookings());
  }, [dispatch]);
  return (
    <>
      {!loading && <p>Booking Details</p>}
      {values.length > 0 &&
        values.map((value) => <p key={value._id}>{value.passengerName}</p>)}
    </>
  );
};

export default FlightDetails;
