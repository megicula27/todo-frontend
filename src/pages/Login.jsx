import React, { useContext } from "react";
import { useState } from "react";
import Context, { server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, setIsLoggedIn, isLoading, setIsLoading } =
    useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
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

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
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
          Login
        </button>
        <p>or</p>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};
export default Login;
