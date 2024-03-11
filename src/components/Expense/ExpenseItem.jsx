import React from "react";
import classes from "./ExpenseItem.module.css";
const ExpenseItem = (props) => {
  const { expense } = props;
  return (
    <li>
      <div className={classes["expense-item"]}>
        <div>{expense.moneySpent}</div>
        <div>{expense.description}</div>
        <div>{expense.category}</div>
      </div>
    </li>
  );
};

export default ExpenseItem;
