import React, { useRef } from "react";
import classes from "./Login.module.css";
import { useHistory, NavLink } from "react-router-dom/cjs/react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";

const Login = (props) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const verifyUser = async (email, password) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBK8Hfm1ccNpEEMJ0Zi6Og3o-jwrbwt-JM",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    dispatch(
      authActions.login({
        token: data.idToken,
        email: email.replace(/[@.]/g, ""),
      })
    );
    history.replace("/expense");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    if (email.length > 0 && password.length > 0) {
      try {
        verifyUser(email, password);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="loginEmail">Email</label>
          <input type="email" id="loginEmail" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            id="loginPassword"
            required
            minLength="7"
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
      <div className={classes.actions}>
        <NavLink to="/forgetPassword" activeClassName={classes.active}>
          Forget Password
        </NavLink>
      </div>
      <div className={classes.actions}>
        <button
          type="button"
          onClick={() => {
            history.replace("/signup");
          }}
        >
          Create New Account
        </button>
      </div>
    </section>
  );
};

export default Login;
