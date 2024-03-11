import React, { useContext, useRef } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const AuthForm = (props) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.value;
    if (
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    ) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBK8Hfm1ccNpEEMJ0Zi6Og3o-jwrbwt-JM",
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
          throw new Error("Signup failed");
        }
        const data = await response.json();
        authCtx.login(data.idToken);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>SignUp</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="authEmail">Email</label>
          <input type="email" id="authEmail" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="authPassword">Password</label>
          <input
            type="password"
            id="authPassword"
            required
            minLength="7"
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            required
            minLength="7"
            ref={confirmPasswordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Sign Up</button>
        </div>
      </form>
      <div className={classes.actions}>
        <button type="button" onClick={() => history.replace("/login")}>
          Login with existing account
        </button>
      </div>
    </section>
  );
};

export default AuthForm;
