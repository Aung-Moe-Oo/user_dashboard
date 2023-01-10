import React, { useState } from "react";
import css from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../requestMethod";

const Register = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Your passwords do not match.");
    } else {
      request
        .post("/auth/register", {
          userid: userId,
          password: password,
        })
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        <h1>
          Welcome to <span>myApp</span>
        </h1>
        <div className={css.line}></div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="userid">User ID*</label>
          <input
            type="text"
            id="userid"
            name="userid"
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password">Confirm Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />
          <div className={css.buttonWrapper}>
            <button type="submit">Register</button>
          </div>
        </form>

        <div className={css.link}>
          <p>Already have account?</p>

          <Link to={"/login"}>login here.</Link>
        </div>
      </div>

      {error && <div className={css.error}>{error.message}</div>}
      {passwordError.length > 0 && (
        <div className={css.error}>{passwordError}</div>
      )}
    </div>
  );
};

export default Register;
