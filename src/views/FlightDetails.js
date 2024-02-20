import React, { useEffect } from "react";
import { viewBookings } from "../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "./Table";

const FlightDetails = () => {
  const { loading, error, values } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewBookings());
  }, [dispatch]);
  return (
    <>
      {loading && (
        <div className="text-center">
          <div
            className="spinner-border"
            style={{ width: "4rem", height: "4rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && values.length === 0 && (
        <p className="text-center fs-2">No records</p>
      )}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && values.length > 0 && <p className="fs-2">Booking Details</p>}

      {!loading && values.length > 0 && <Table data={values} />}
    </>
  );
};

export default FlightDetails;
