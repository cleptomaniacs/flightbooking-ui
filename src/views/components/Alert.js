import React from "react";

export const Alert = ({ type, message }) => {
  return (
    <div>
      {type === "danger" && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}
      {type === "info" && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}
      {type === "warning" && (
        <div className="alert alert-warning" role="alert">
          {message}
        </div>
      )}
      {type === "success" && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};
