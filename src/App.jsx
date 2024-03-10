import React, { useContext } from "react";
import AuthForm from "./components/Auth/AuthForm";
import Login from "./components/Auth/Login";
import Expense from "../src/components/Expense/Expense";
import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import AuthContext from "./store/auth-context";
const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <Expense />
        </Route>

        <Route path="/auth">
          <AuthForm />
          <Login />
        </Route>

        {/* {authCtx.isLoggedIn && (
          <>
            <Route path="/store">
              <Product />
            </Route>
            <Route path="/profile">
              <UserProfile />
            </Route>
          </>
        )} */}
        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </main>
  );
};

export default App;
