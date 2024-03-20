import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ExpenseItem from "./ExpenseItem";

describe("ExpenseItem Component", () => {
  const onDelete = jest.fn();
  const onEdit = jest.fn();
  const expense = {
    id: "1",
    moneySpent: 100,
    description: "Groceries",
    category: "Food",
  };

  test("renders expense details correctly", () => {
    render(
      <ExpenseItem expense={expense} onDelete={onDelete} onEdit={onEdit} />
    );
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/Groceries/i)).toBeInTheDocument();
    expect(screen.getByText(/Food/i)).toBeInTheDocument();
  });

  test("calls onDelete with correct id when Delete button is clicked", () => {
    render(
      <ExpenseItem expense={expense} onDelete={onDelete} onEdit={onEdit} />
    );
    fireEvent.click(screen.getByText(/Delete/i));
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  test("calls onEdit with correct expense when Edit button is clicked", () => {
    render(
      <ExpenseItem expense={expense} onDelete={onDelete} onEdit={onEdit} />
    );
    fireEvent.click(screen.getByText(/Edit/i));
    expect(onEdit).toHaveBeenCalledWith(expense);
  });
});
