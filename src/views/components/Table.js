import React from "react";

export const Table = ({ data, onDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Flight ID</th>
          <th>Booking ID</th>
          <th>No of tickets</th>
          <th>Amount</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((d) => (
            <tr key={d._id}>
              <td>{d.passengerName}</td>
              <td>{d.flightId}</td>
              <td>{d.bookingId}</td>
              <td>{d.numberOfTickets}</td>
              <td>{d.amount}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(d._id)}
                >
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
