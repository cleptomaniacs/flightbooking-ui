import React from "react";

export const NoRecords = ({ message }) => {
  return (
    <div className="text-center">
      <p className="mb-0" style={{ fontSize: "5rem" }}>
        <i className="fa fa-file-text-o"></i>
      </p>
      <p className="text-secondary  fw-light fs-2">{message}</p>
    </div>
  );
};
