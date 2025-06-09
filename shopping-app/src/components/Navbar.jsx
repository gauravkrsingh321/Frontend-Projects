import React from "react";
import { FaMoon, FaShoppingCart, FaSun } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const Navbar = ({theme,themeHandler}) => {
  const cart = useSelector((state) => state.cart);
  return (
    <div>
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        <NavLink to="/">
          <div className="ml-5 ">
            <img className="w-32 md:w-48 p-4" src="./logo.png" alt="logo" />
          </div>
        </NavLink>
        <div className="flex items-center font-medium dark:text-slate-100 text-green-500 mr-5 md:space-x-6 space-x-4">
          <button className='cursor-pointer  text-2xl' onClick={themeHandler}>
          { theme === 'dark' ? <FaSun color="white"/> : <FaMoon color="green"/> }
        </button>

          <NavLink to="/">
            <p>Home</p>
          </NavLink>

          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl" />

              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
