import React from "react";
import { useNavigate } from "react-router-dom";

export const Guideline = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-center mb-4">Welcome to Flight Booking System!</h2>
      <h3 className="mb-3">Quick Guidelines:</h3>
      <ol className="mb-3">
        <li>
          While booking, enter proper flight ID {"("} having 4 digit numbers
          {")"}
        </li>
        <li>Number of booking tickets can not be more than 40</li>
      </ol>
      <button
        className="btn btn-primary px-4"
        onClick={() => navigate("/booking")}
      >
        Got It
      </button>
    </div>
  );
};
