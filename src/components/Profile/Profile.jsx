import { useContext, useRef } from "react";
import classes from "./Profile.module.css";
import UserContext from "../../store/user-context";
import AuthContext from "../../store/auth-context";

const Profile = () => {
  const nameInputRef = useRef(null);
  const photoUrlInputRef = useRef(null);
  const userCtx = useContext(UserContext);
  const authCtx = useContext(AuthContext);

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
              idToken: authCtx.token,
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
        userCtx.saveUser({
          id: data.localId,
          fullName: data.displayName,
          profilePhotoUrl: data.photoUrl,
          email: data.email,
          emailVerified: userCtx.user.emailVerified,
        });
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
            idToken: authCtx.token,
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
      userCtx.saveUser({ ...userCtx.user, emailVerified: !!data.email });
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
            defaultValue={userCtx.user.fullName}
          />
        </div>
        <div>
          <label htmlFor="profilePhotoUrl">Profile Photo Url </label>
          <input
            type="url"
            name="profilePhotoUrl"
            id="profilePhotoUrl"
            ref={photoUrlInputRef}
            defaultValue={userCtx.user.profilePhotoUrl}
          />
        </div>
        <button>Update</button>
      </form>
      <div className={classes.user}>
        <h1>User detail</h1>
        <p>{userCtx.user.fullName}</p>
        <p>{userCtx.user.profilePhotoUrl}</p>
        <p>{userCtx.user.email}</p>
        {!userCtx.user.emailVerified && (
          <button onClick={verifyEmailHandler}>Verify Email</button>
        )}
      </div>
    </section>
  );
};
export default Profile;
