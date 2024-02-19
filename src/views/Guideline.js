import React from "react";

export const Guideline = ({ onSetIsGuideline }) => {
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
        className="btn btn-secondary px-4"
        onClick={() => onSetIsGuideline()}
      >
        Got It
      </button>
    </div>
  );
};
