import React from "react";
import classes from "./Expense.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
const Expense = (props) => {
  return (
    <section className={classes.expense}>
      <div>Welcome to expense tracker</div>
      <button>
        <Link to="/profile">Complete your profile</Link>
      </button>
    </section>
  );
};

export default Expense;
