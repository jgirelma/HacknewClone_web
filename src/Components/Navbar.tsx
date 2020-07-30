import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Contexts/AppContext";

export default function Navbar() {
  //Only used in responsive mode
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  return (
    <>
      <div className="hidden md:visible px-2 md:px-0 bg-white py-4 border-b border-gray-300">
        <header className="font-mono container flex justify-between mx-auto items-center">
          <div className="text-2xl w-1/3">HackerNews Clone</div>
          <div className="w-1/3 flex text-lg justify-center items-center">
            <Link to="/">
              <button
                onClick={() => dispatch({ type: "firstPage" })}
                className="hover:text-green-400"
              >
                Home
              </button>
            </Link>
            <Link className="" to="/newpost">
              <button className="ml-4 hover:text-green-400">New Post</button>
            </Link>
          </div>
          <div className="flex items-center justify-end w-1/3 text-lg">
            {!!state.user ? (
              <Link to="/logout">
                <div className="ml-8 hover:text-green-400">Logout</div>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <button className="hover:text-green-400">Login</button>
                </Link>
                <Link to="/register">
                  <div className="ml-8 hover:text-green-400">Register</div>
                </Link>
              </>
            )}
          </div>
        </header>
      </div>
      <div className="visible md:hidden px-2 md:px-0 bg-white py-2 border-b border-gray-300">
        <header className="font-mono container flex justify-between mx-auto items-center">
          <div className="text-xl">HackerNews Clone</div>
          {!open ? (
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col h-16 justify-center space-y-2"
            >
              <div className="w-8 border-b-2 border-gray-800"></div>
              <div className="w-8 border-b-2 border-gray-800"></div>
              <div className="w-8 border-b-2 border-gray-800"></div>
            </button>
          ) : (
            <button
              onClick={() => setOpen(!open)}
              className="text-3xl h-16 mr-2 text-gray-800"
            >
              &#10799;
            </button>
          )}
        </header>
        {open && (
          <div className="font-mono container space-y-1 divide-y">
            <div>
              <Link to="/">
                <div onClick={() => setOpen(!open)} className="div">
                  Home
                </div>
              </Link>
              <Link to="/newpost">
                <div onClick={() => setOpen(!open)} className="div">
                  New Post
                </div>
              </Link>
            </div>
            {!!state.user ? (
              <div>
                <Link to="/logout">
                  <div
                    onClick={() => setOpen(!open)}
                    className="hover:text-green-400"
                  >
                    Logout
                  </div>
                </Link>
              </div>
            ) : (
              <div className="">
                <Link to="/login">
                  <div
                    onClick={() => setOpen(!open)}
                    className="hover:text-green-400"
                  >
                    Login
                  </div>
                </Link>
                <Link to="/register">
                  <div
                    onClick={() => setOpen(!open)}
                    className="hover:text-green-400"
                  >
                    Register
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
