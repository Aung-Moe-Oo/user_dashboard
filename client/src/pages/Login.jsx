import React, { useState, useContext } from "react";
import css from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogging, setKeepLogging] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const inputs = {
    userid: userId,
    password: password,
    keepLogging: keepLogging,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        <h1>
          Welcome to <span>myApp</span>
        </h1>
        <div className={css.line}></div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userid">User ID*</label>
              <input
                type="text"
                id="userid"
                name="userid"
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={css.buttonWrapper}>
              <label htmlFor="keepLoggedIn" className={css.checkbox}>
                <input
                  type="checkbox"
                  id="keepLoggedIn"
                  name="keepLoggedIn"
                  onChange={() => setKeepLogging(!keepLogging)}
                />
              </label>
              <br />
              <button type="submit">Log in</button>
            </div>
          </form>
        </div>
        <div className={css.link}>
          <p>No account?</p>
          <Link to={"/register"}>Register here.</Link>
        </div>
      </div>
      {error && <div className={css.error}>{error?.response?.data}</div>}
    </div>
  );
};

export default Login;
