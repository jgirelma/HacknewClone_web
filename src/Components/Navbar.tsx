import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Contexts/AppContext";

export default function Navbar() {
  //Only used in responsive mode
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="bg-white py-4 border-b border-gray-300">
      <header className="font-mono container flex justify-between mx-auto items-center">
        <div className="text-2xl w-1/3">HackerNews Clone</div>
        <div className="w-1/3 flex text-lg justify-center items-center">
          <Link to="/">
            <button onClick={() => dispatch({type:"firstPage"})} className="hover:text-green-400">
              Home
            </button>
          </Link>
          <Link className="" to="/newpost">
            <button className="ml-4 hover:text-green-400">
              New Post
            </button>
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
                <button className="hover:text-green-400">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <div className="ml-8 hover:text-green-400">
                  Register
                </div>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
