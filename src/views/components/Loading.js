import React from "react";

export const Loading = () => {
  return (
    <div className="text-center">
      <div
        className="spinner-grow"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
