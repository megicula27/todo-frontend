import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Link
import Context, { server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, setIsLoggedIn, isLoading, setIsLoading } =
    useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setIsLoggedIn(true);
      setIsLoading(false);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter Name"
        ></input>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your Email"
        ></input>
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <button type="submit" disabled={isLoading}>
          Register
        </button>
        <p>or</p>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
};

export default Register;
