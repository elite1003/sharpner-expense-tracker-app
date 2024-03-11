import React, { useRef, useState } from "react";
import classes from "./Expense.module.css";
import ExpenseItem from "./ExpenseItem";

const Expense = (props) => {
  const moneySpentInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const [expenses, setExpenses] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const moneySpent = moneySpentInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const category = categoryInputRef.current.value;
    setExpenses((prevState) => [
      { moneySpent, description, category },
      ...prevState,
    ]);
  };
  return (
    <>
      <section className={classes.expense}>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="moneySpent">Money Spent</label>
            <input
              type="Number"
              id="moneySpent"
              required
              ref={moneySpentInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              required
              ref={descriptionInputRef}
            />
          </div>
          <div className={classes.control}>
            <label>Category</label>
            <select value={props.selected} ref={categoryInputRef}>
              <option value="FOOD">FOOD</option>
              <option value="PETROL">PETROL</option>
              <option value="SALARY">SALARY</option>
              <option value="MISC.">MISC.</option>
            </select>
          </div>
          <div className={classes.actions}>
            <button>Add Expense</button>
          </div>
        </form>
      </section>
      <section className={classes.expense}>
        <ul className={classes.expensesList}>
          {expenses.length === 0 && (
            <h2 className={classes.expenseslistFallback}>Found no expenses.</h2>
          )}
          {expenses.map((expense) => {
            return <ExpenseItem expense={expense} />;
          })}
        </ul>
      </section>
    </>
  );
};

export default Expense;
