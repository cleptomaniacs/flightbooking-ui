import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const Layout = () => {
  const user = useAuth();
  const onLogout = (e) => {
    e.preventDefault();
    user.logout();
  };
  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            Flight Booking
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              {user.token && (
                <li className="nav-item">
                  <Link to={"/booking"} className="nav-link">
                    Book Flight
                  </Link>
                </li>
              )}

              {user.token && (
                <li className="nav-item">
                  <Link to={"/details"} className="nav-link">
                    Flight Details
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ms-auto">
              {!user.token && (
                <>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Register
                    </Link>
                  </li>
                </>
              )}
              {user.token && (
                <li className="nav-item">
                  <Link
                    to={""}
                    onClick={(e) => onLogout(e)}
                    className="nav-link"
                  >
                    Log out
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
