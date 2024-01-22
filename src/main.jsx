import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { useState } from "react";
import { createContext } from "react";

export const server = "http://localhost:4000/api/v1";
const Context = createContext({ isLoggedIn: false });

const AppWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
export default Context;
