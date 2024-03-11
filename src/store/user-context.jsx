import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const UserContext = React.createContext({
  user: {},
  saveUser: (user) => {},
});

export const UserContextProvider = (props) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const history = useHistory();
  const [user, setUser] = useState({
    id: "",
    fullName: "",
    profilePhotoUrl: "",
    email: "",
    emailVerified: false,
  });

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBK8Hfm1ccNpEEMJ0Zi6Og3o-jwrbwt-JM",
      {
        method: "POST",
        body: JSON.stringify({ idToken: token }),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => data.users[0])
      .then((user) =>
        setUser({
          id: user.localId,
          fullName: user.displayName,
          profilePhotoUrl: user.photoUrl,
          email: user.email,
          emailVerified: user.emailVerified,
        })
      )
      .catch((e) => {
        history.replace("/login");
      });
  }, [token, history]);
  const saveUserHandler = (user) => {
    setUser(user);
  };
  const contextValue = {
    user: user,
    saveUser: saveUserHandler,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
