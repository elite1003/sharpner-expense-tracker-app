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
        <button type="button" onClick={() => props.onDelete(expense.id)}>
          Delete
        </button>
        <button type="button" onClick={() => props.onEdit(expense)}>
          Edit
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
