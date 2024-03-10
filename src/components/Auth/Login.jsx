import React, { useRef, useContext } from "react";
import classes from "./Login.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const Login = (props) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    if (email.length > 0 && password.length > 0) {
      try {
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
        authCtx.login(data.idToken);
        history.replace("/");
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
        <p>Reset password</p>
      </form>
      <div className={classes.actions}>
        <button type="button">Create New Account</button>
      </div>
    </section>
  );
};

export default Login;
