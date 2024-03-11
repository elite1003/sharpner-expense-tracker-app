import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./Expense.module.css";
import ExpenseItem from "./ExpenseItem";

const Expense = (props) => {
  const moneySpentInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await fetch(
        "https://swapi-movie-app-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
      );
      if (!response.ok) {
        throw new Error("failed to fetch expenses");
      }
      const data = await response.json();
      let expenses = [];
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          expenses.push({ id: key, ...data[key] });
        }
      }
      setExpenses(expenses);
    } catch (error) {
      alert(error.message);
    }
  }, [setExpenses]);
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const saveExpenses = useCallback(
    async (expense) => {
      try {
        const response = await fetch(
          "https://swapi-movie-app-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
          {
            method: "POST",
            body: JSON.stringify(expense),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("failed to save expenses");
        }
        const data = await response.json();
        setExpenses((prev) => [...prev, { id: data.name, ...expense }]);
      } catch (error) {
        alert(error.message);
      }
    },
    [setExpenses]
  );
  const submitHandler = (e) => {
    e.preventDefault();
    const moneySpent = moneySpentInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const category = categoryInputRef.current.value;
    const expense = { moneySpent, description, category };
    saveExpenses(expense);
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
              min={1}
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
            return <ExpenseItem key={expense.id} expense={expense} />;
          })}
        </ul>
      </section>
    </>
  );
};

export default Expense;
