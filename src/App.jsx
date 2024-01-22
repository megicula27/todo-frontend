import React from "react";
import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Header from "./components/Header.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import Context from "./main.jsx";
import { server } from "./main.jsx";

const App = () => {
  const { isLoggedIn, setIsLoggedIn, setUser, setIsLoading } =
    useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${server}/users/me`,

        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setUser(res.data.user.name), setIsLoggedIn(true), setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setUser({}), setIsLoading(false), setIsLoggedIn(false);
      });
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
