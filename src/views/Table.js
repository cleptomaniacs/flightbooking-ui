import React from "react";

export const Table = ({ data }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>No of tickets</th>
          <th>Booking ID</th>
          <th>Flight ID</th>
          <th>Amount</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((d) => (
            <tr key={d._id}>
              <td>{d.passengerName}</td>
              <td>{d.numberOfTickets}</td>
              <td>-/-/-</td>
              <td>{d.flightId.toUpperCase()}</td>
              <td>-/-/-</td>
              <td>
                <button className="btn btn-sm btn-outline-danger">
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
