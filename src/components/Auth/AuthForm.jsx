import React, { useRef } from "react";
import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const formRef = useRef(null);
  let formInputData;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      e.target.email.value.length > 0 &&
      e.target.password.value.length > 0 &&
      e.target.confirmPassword.value.length > 0 &&
      e.target.password.value === e.target.confirmPassword.value
    ) {
      formInputData = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBK8Hfm1ccNpEEMJ0Zi6Og3o-jwrbwt-JM",
          {
            method: "POST",
            body: JSON.stringify({
              ...formInputData,
              returnSecureToken: true,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        alert(error.message);
      }
    }
  };
  return (
    <section className={classes.auth}>
      <h1>SignUp</h1>
      <form onSubmit={submitHandler} ref={formRef}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required minLength="7" />
        </div>
        <div className={classes.control}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" required minLength="7" />
        </div>
        <div className={classes.actions}>
          <button>Sign Up</button>
        </div>
      </form>
      <div className={classes.actions}>
        <button type="button" className={classes.toggle}>
          Login with existing account
        </button>
      </div>
    </section>
  );
};

export default AuthForm;
