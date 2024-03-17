import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import userReducer from "./user";
import expensesReducer from "./expenses";
import themeReducer from "./theme";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    expenses: expensesReducer,
    theme: themeReducer,
  },
});

export default store;
