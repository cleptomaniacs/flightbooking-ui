import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { login, clearError } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./components/Loading";
import { Alert } from "./components/Alert";

export const Login = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
    if (!loading && !error) {
      clearError();
      document.getElementById("form").reset();
    }
  };
  return (
    <div className="row justify-content-center">
      <div className="col-lg-5">
        {loading && <Loading />}
        {!loading && error && (
          <Alert type={"danger"} message={"Invalid credentials"} />
        )}
        <h5> Sign in</h5>
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required!" })}
            />
            {errors.username && (
              <p className="form-text text-danger">{errors.username.message}</p>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required!",
              })}
            />
            {errors.password && (
              <p className="form-text text-danger">{errors.password.message}</p>
            )}
          </div>
          <input
            type="hidden"
            value={"user"}
            name="role"
            className="form-control"
            placeholder="Enter your password"
            {...register("role")}
          />
          <div className="form-group">
            <button className="btn btn-primary mb-2">Login</button>
            <p>
              Don't have an account?{" "}
              <Link className="text-decoration-none" to={"/register"}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
