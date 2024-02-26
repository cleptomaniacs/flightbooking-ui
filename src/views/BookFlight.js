import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { makeBooking, clearError } from "../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./components/Loading";
import { Alert } from "./components/Alert";
import { useAuth } from "../hooks/AuthProvider";
import { Navigate } from "react-router-dom";

export const BookFlight = () => {
  const user = useAuth();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFlightBooking = (data) => {
    dispatch(makeBooking(data));
    if (!loading && !error) {
      document.getElementById("bookingForm").reset();
    }
  };
  if (!user.token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="row justify-content-center">
      <div className="col-lg-5">
        {loading && <Loading />}
        {!loading && error && <Alert type={"danger"} message={error} />}
        <form id="bookingForm" onSubmit={handleSubmit(onFlightBooking)}>
          <div className="form-group mb-3">
            <label className="form-label">Passenger name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter passenger name"
              {...register("passengerName", {
                required: "Passenger name is required",
              })}
            />
            {errors.passengerName && (
              <p className="form-text text-danger">
                {errors.passengerName?.message}
              </p>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Number of tickets</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter number of tickets"
              {...register("numberOfTickets", {
                required: "Number of tickets is required",
                min: {
                  value: 1,
                  message: "Number of tickets should not be less than 0",
                },
                max: {
                  value: 40,
                  message: "Number of tickets should not exceed 40",
                },
              })}
            />
            {errors.numberOfTickets && (
              <p className="form-text text-danger">
                {errors.numberOfTickets?.message}
              </p>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Flight ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter flight ID"
              {...register("flightId", {
                required: "Flight ID is required",
                pattern: {
                  value: /^[A-Z]{3}-[0-9]{3}$/,
                  message: "Invalid flight ID (e.g., ABC-123)",
                },
              })}
            />
            {errors.flightId && (
              <p className="form-text text-danger">
                {errors.flightId?.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};
