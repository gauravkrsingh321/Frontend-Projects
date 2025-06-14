import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  const [theme, setTheme] = useState(() => {
  // load from localStorage or default to "light"
  return localStorage.getItem("theme") || "light";
});

 const location = useLocation(); //Get current route
 console.log(location)

function themeHandler() {
      setTheme(prev => (prev === "light" ? "dark" : "light"));
  }
  useEffect(() => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}, [theme]);

  //Conditionally render Navbar
  // Show navbar only on "/" and "/cart"
  const showNavbar = location.pathname === "/" || location.pathname === "/cart";

  return (
    <div>
      {showNavbar && (
        <div className="dark:bg-slate-900 border-1 dark:border-1 dark:border-b-white border-b-black bg-white">
          <Navbar theme={theme} themeHandler={themeHandler} />
        </div>
      )}
      
      <Routes>
        <Route path="/" element={<Home theme={theme}/>} />
        <Route path="/cart" element={<Cart theme={theme}/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </div>
  );
};

export default App;
