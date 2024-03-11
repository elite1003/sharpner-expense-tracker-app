import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./Expense.module.css";
import ExpenseItem from "./ExpenseItem";

const Expense = (props) => {
  const moneySpentInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const [expenses, setExpenses] = useState([]);
  const [idEditSelected, setIdEditSeleceted] = useState(null);

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

  const saveExpense = async (expense) => {
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
  };

  const expenseDeleteHandler = async (id) => {
    try {
      const response = await fetch(
        `https://swapi-movie-app-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("failed to delete expenses");
      }
      console.log("Expense successfuly deleted");
      let updatedExpenses = [];
      updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
    } catch (error) {
      alert(error.message);
    }
  };
  const updateExpense = async (expense) => {
    try {
      const response = await fetch(
        `https://swapi-movie-app-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${idEditSelected}.json`,
        {
          method: "PUT",
          body: JSON.stringify(expense),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("failed to update expenses");
      }
      const data = await response.json();
      const existingItemIndex = expenses.findIndex(
        (expense) => expense.id === idEditSelected
      );
      const updatedItem = { ...data, id: idEditSelected };
      const updatedItems = [...expenses];
      updatedItems[existingItemIndex] = updatedItem;
      setExpenses(updatedItems);
      setIdEditSeleceted(null);
    } catch (error) {
      alert(error.message);
    }
  };
  const expenseEditHandler = (expense) => {
    setIdEditSeleceted(expense.id);
    moneySpentInputRef.current.value = expense.moneySpent;
    descriptionInputRef.current.value = expense.description;
    categoryInputRef.current.value = expense.category;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const moneySpent = moneySpentInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const category = categoryInputRef.current.value;
    const expense = { moneySpent, description, category };
    if (!idEditSelected) saveExpense(expense);
    else {
      updateExpense(expense);
    }
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
            return (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDelete={expenseDeleteHandler}
                onEdit={expenseEditHandler}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Expense;
