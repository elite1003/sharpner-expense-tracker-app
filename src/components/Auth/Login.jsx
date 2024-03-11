import React, { useRef, useContext } from "react";
import classes from "./Login.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory, NavLink } from "react-router-dom/cjs/react-router-dom";
import UserContext from "../../store/user-context";

const Login = (props) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const history = useHistory();

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
    getUserDetail(data.idToken);
    authCtx.login(data.idToken);
  };
  const getUserDetail = async (idToken) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBK8Hfm1ccNpEEMJ0Zi6Og3o-jwrbwt-JM",
      {
        method: "POST",
        body: JSON.stringify({ idToken: idToken }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("user fetch failed");
    }
    const data = await response.json();
    const user = data.users[0];
    userCtx.saveUser({
      id: user.localId,
      fullName: user.displayName,
      profilePhotoUrl: user.photoUrl,
      email: user.email,
      emailVerified: user.emailVerified,
    });
    history.replace("/profile");
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
