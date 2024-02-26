import React, { useEffect } from "react";
import { viewBookings, deleteBooking } from "../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "./components/Table";
import { Loading } from "./components/Loading";
import { Alert } from "./components/Alert";
import { NoRecords } from "./components/NoRecords";
import { useAuth } from "../hooks/AuthProvider";
import { Navigate } from "react-router-dom";

const FlightDetails = () => {
  const user = useAuth();
  const { loading, error, values } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.token) {
      console.log("User token : ", user.token);
      dispatch(viewBookings());
    }
  }, [dispatch, user.token]);
  if (!user.token) {
    return <Navigate to={"/login"} />;
  }

  const onDeleteBooking = (id) => {
    if (window.confirm("Are you sure you want to delete this booking")) {
      dispatch(deleteBooking(id));
    }
  };
  return (
    <>
      {loading && <Loading />}

      {!loading && !error && values.length === 0 && (
        <NoRecords message={"No flight booking records"} />
      )}

      {!loading && error && <Alert type={"danger"} message={error} />}

      {!loading && values.length > 0 && <p className="fs-2">Booking Details</p>}

      {!loading && values.length > 0 && (
        <Table data={values} onDelete={onDeleteBooking} />
      )}
    </>
  );
};

export default FlightDetails;
