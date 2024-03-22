import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseItem from "./ExpenseItem"; // assuming you have an ExpenseItem component in ExpenseItem.js

const mockExpense = {
  id: "1",
  moneySpent: 100,
  description: "Test Expense",
  category: "Test Category",
};

const mockDelete = jest.fn();
const mockEdit = jest.fn();

test("ExpenseItem component should render without crashing", () => {
  render(
    <ExpenseItem
      expense={mockExpense}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
});

test("ExpenseItem component should display the correct money spent", () => {
  render(
    <ExpenseItem
      expense={mockExpense}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
  expect(screen.getByText("100")).toBeInTheDocument();
});

test("ExpenseItem component should display the correct description", () => {
  render(
    <ExpenseItem
      expense={mockExpense}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
  expect(screen.getByText("Test Expense")).toBeInTheDocument();
});

test("ExpenseItem component should display the correct category", () => {
  render(
    <ExpenseItem
      expense={mockExpense}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
  expect(screen.getByText("Test Category")).toBeInTheDocument();
});

test("ExpenseItem component should call onDelete when Delete button is clicked", () => {
  render(
    <ExpenseItem
      expense={mockExpense}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
  fireEvent.click(screen.getByText("Delete"));
  expect(mockDelete).toHaveBeenCalledWith("1");
});

test("ExpenseItem component should call onEdit when Edit button is clicked", () => {
  render(
    <ExpenseItem
      expense={mockExpense}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
  fireEvent.click(screen.getByText("Edit"));
  expect(mockEdit).toHaveBeenCalledWith(mockExpense);
});

test("ExpenseItem component should not display money spent if not provided", () => {
  render(
    <ExpenseItem
      expense={{ ...mockExpense, moneySpent: undefined }}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
  expect(screen.queryByText("100")).not.toBeInTheDocument();
});

test("ExpenseItem component should not display description if not provided", () => {
  render(
    <ExpenseItem
      expense={{ ...mockExpense, description: undefined }}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
  expect(screen.queryByText("Test Expense")).not.toBeInTheDocument();
});

test("ExpenseItem component should not display category if not provided", () => {
  render(
    <ExpenseItem
      expense={{ ...mockExpense, category: undefined }}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
  expect(screen.queryByText("Test Category")).not.toBeInTheDocument();
});

test("ExpenseItem component should not call onDelete or onEdit if not provided", () => {
  render(<ExpenseItem expense={mockExpense} />);
  fireEvent.click(screen.getByText("Delete"));
  fireEvent.click(screen.getByText("Edit"));
  expect(mockDelete).not.toHaveBeenCalled();
  expect(mockEdit).not.toHaveBeenCalled();
});
