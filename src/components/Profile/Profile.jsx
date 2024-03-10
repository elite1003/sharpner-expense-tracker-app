import { useRef } from "react";
import classes from "./Profile.module.css";

const Profile = () => {
  const nameInputRef = useRef(null);
  const photoUrlInputRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoUrlInputRef.current.value;
    if (enteredName.length > 0 && enteredPhotoUrl.length > 0) {
      try {
        const response = await fetch(
          "https://swapi-movie-app-default-rtdb.asia-southeast1.firebasedatabase.app/user.json",
          {
            method: "POST",
            body: JSON.stringify({
              fullName: enteredName,
              profilePhotoUrl: enteredPhotoUrl,
            }),
            headers: { "Content-type": "application/json" },
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (e) {
        alert(e.message);
      }
    }
  };

  return (
    <section className={classes.profile}>
      <header>
        <h1>Winners never quit, Quitters never win</h1>
        <h1>your profile is x% complete. Complete Now</h1>
      </header>
      <form onSubmit={submitHandler}>
        <h1>Contact Details</h1>
        <div>
          <label htmlFor="fullname">Full Name </label>
          <input type="text" name="fullname" id="fullname" ref={nameInputRef} />
        </div>
        <div>
          <label htmlFor="profilePhotoUrl">Profile Photo Url </label>
          <input
            type="url"
            name="profilePhotoUrl"
            id="profilePhotoUrl"
            ref={photoUrlInputRef}
          />
        </div>
        <button>Update</button>
      </form>
    </section>
  );
};
export default Profile;
