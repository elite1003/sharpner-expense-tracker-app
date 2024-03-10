import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import classes from "./Header.module.css";
import AuthContext from "../../store/auth-context";
const Header = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <header className={classes.header}>
        <NavLink to="/" exact activeClassName={classes.active}>
          Home
        </NavLink>
        {!authCtx.isLoggedIn && (
          <>
            <NavLink to="/signup" activeClassName={classes.active}>
              Sign Up
            </NavLink>
            <NavLink to="/login" activeClassName={classes.active}>
              log In
            </NavLink>
          </>
        )}
        {authCtx.isLoggedIn && (
          <NavLink to="/profile" activeClassName={classes.active}>
            profile
          </NavLink>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
