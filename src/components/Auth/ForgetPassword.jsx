import React, { useRef } from "react";
import classes from "./ForgetPassword.module.css";

const ForgetPassword = () => {
  const emailInputRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBK8Hfm1ccNpEEMJ0Zi6Og3o-jwrbwt-JM",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
          headers: { "Content-type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("password reset failed");
      }
      emailInputRef.current.value = "";
      alert("check your gmail to reset password");
    } catch (error) {
      alert(e.message);
    }
  };
  return (
    <section className={classes.forget}>
      <h1>Forget Password</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="userEmail">Email</label>
          <input type="email" id="userEmail" required ref={emailInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Reset Password</button>
        </div>
      </form>
    </section>
  );
};

export default ForgetPassword;
