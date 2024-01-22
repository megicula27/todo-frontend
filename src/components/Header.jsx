import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../main";
import { server } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";
const Header = () => {
  const { isLoading, setIsLoading, isLoggedIn, setIsLoggedIn } =
    useContext(Context);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.get(`${server}/users/logout`, { withCredentials: true });

      toast.success("Logged out successfully");
      setIsLoading(false);
      setIsLoggedIn(false);
    } catch (err) {
      console.error(err); // Log the error for debugging
      setIsLoggedIn(true);
      toast.error("An error occurred during logout. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <button onClick={handleLogout} disabled={isLoading}>
          Logout
        </button>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default Header;
