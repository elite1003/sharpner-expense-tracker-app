import { Link } from "react-router-dom/cjs/react-router-dom";
const HomePage = () => {
  return (
    <div>
      <div style={{ marginTop: "100px" }}>Welcome to expense tracker</div>
      <button>
        <Link to="/profile">Complete your profile</Link>
      </button>
    </div>
  );
};

export default HomePage;
