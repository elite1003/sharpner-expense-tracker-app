import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import userReducer from "./user";
import expensesReducer from "./expenses";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    expenses: expensesReducer,
  },
});

export default store;
