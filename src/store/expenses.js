import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: [],
  reducers: {
    saveExpense(state, action) {
      state.unshift(action.payload);
    },
    updateExpense(state, action) {
      state[action.payload.existingItemIndex] = action.payload.updatedItem;
    },
    updateExpenses(state, action) {
      return action.payload;
    },
  },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
