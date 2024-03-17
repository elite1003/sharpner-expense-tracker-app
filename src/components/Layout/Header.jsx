import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import classes from "./Header.module.css";
import { authActions } from "../../store/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Header = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/login");
  };
  return (
    <Fragment>
      <header className={classes.header}>
        <NavLink to="/" exact activeClassName={classes.active}>
          Home
        </NavLink>
        {!isLoggedIn && (
          <>
            <NavLink to="/signup" activeClassName={classes.active}>
              Sign Up
            </NavLink>
            <NavLink to="/login" activeClassName={classes.active}>
              log In
            </NavLink>
          </>
        )}
        {isLoggedIn && (
          <>
            <NavLink to="/profile" activeClassName={classes.active}>
              Profile
            </NavLink>
            <NavLink to="/expense" activeClassName={classes.active}>
              Expense
            </NavLink>
            <button onClick={logoutHandler}>LogOut</button>
          </>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
