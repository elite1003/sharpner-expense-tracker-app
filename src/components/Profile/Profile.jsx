import { useRef, useEffect } from "react";
import classes from "./Profile.module.css";
import { useSelector } from "react-redux";
import { userActions } from "../../store/user";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";

const Profile = () => {
  const nameInputRef = useRef(null);
  const photoUrlInputRef = useRef(null);
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
        dispatch(
          userActions.saveUser({
            id: user.localId,
            fullName: user.displayName,
            profilePhotoUrl: user.photoUrl,
            email: user.email,
            emailVerified: user.emailVerified,
          })
        )
      )
      .catch((e) => {
        history.replace("/login");
      });
  }, [dispatch, token, history]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoUrlInputRef.current.value;
    if (enteredName.length > 0 && enteredPhotoUrl.length > 0) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBK8Hfm1ccNpEEMJ0Zi6Og3o-jwrbwt-JM",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: token,
              displayName: enteredName,
              photoUrl: enteredPhotoUrl,
              returnSecureToken: true,
            }),
            headers: { "Content-type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("user details save failed");
        }
        const data = await response.json();
        dispatch(
          userActions.saveUser({
            id: data.localId,
            fullName: data.displayName,
            profilePhotoUrl: data.photoUrl,
            email: data.email,
            emailVerified: userState.emailVerified,
          })
        );
      } catch (e) {
        alert(e.message);
      }
    }
  };

  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBK8Hfm1ccNpEEMJ0Zi6Og3o-jwrbwt-JM",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("failed to verify email");
      }
      const data = await response.json();
      dispatch(
        userActions.saveUser({ ...userState, emailVerified: !!data.email })
      );
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <section className={classes.profile}>
      <header>
        <h1>Winners never quit, Quitters never win</h1>
        <h1>Your profile is x% complete. Complete Now</h1>
      </header>
      <form onSubmit={submitHandler}>
        <h1>Contact Details: </h1>
        <div>
          <label htmlFor="fullname">Full Name </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            ref={nameInputRef}
            defaultValue={userState.fullName}
          />
        </div>
        <div>
          <label htmlFor="profilePhotoUrl">Profile Photo Url </label>
          <input
            type="url"
            name="profilePhotoUrl"
            id="profilePhotoUrl"
            ref={photoUrlInputRef}
            defaultValue={userState.profilePhotoUrl}
          />
        </div>
        <button>Update</button>
      </form>
      <div className={classes.user}>
        <h1>User detail</h1>
        <p>{userState.fullName}</p>
        <p>{userState.profilePhotoUrl}</p>
        <p>{userState.email}</p>
        {!userState.emailVerified && (
          <button onClick={verifyEmailHandler}>Verify Email</button>
        )}
      </div>
    </section>
  );
};
export default Profile;
