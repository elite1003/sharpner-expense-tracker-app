import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Layout/Header";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import Expense from "./components/Expense/Expense";
import { useSelector } from "react-redux";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
          {!isLoggedIn && (
            <Route path="/signup">
              <SignupPage />
            </Route>
          )}
          <Route path="/login">
            <LoginPage />
          </Route>
          {isLoggedIn && (
            <>
              <Route path="/profile">
                <ProfilePage />
              </Route>
              <Route path="/expense">
                <Expense />
              </Route>
            </>
          )}
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
