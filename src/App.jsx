import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Layout/Header";
import { UserContextProvider } from "./store/user-context";
import AuthContext from "./store/auth-context";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import Expense from "./components/Expense/Expense";
const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/forgetPassword">
            <ForgetPasswordPage />
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path="/signup">
              <SignupPage />
            </Route>
          )}
          <UserContextProvider>
            {!authCtx.isLoggedIn && (
              <Route path="/login">
                <LoginPage />
              </Route>
            )}
            {authCtx.isLoggedIn && (
              <>
                <Route path="/profile">
                  <ProfilePage />
                </Route>
                <Route path="/expense">
                  <Expense />
                </Route>
              </>
            )}
          </UserContextProvider>
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
