import { useContext, useEffect, useState } from "react";
import AppContext from "../Contexts/AppContext";
import { useHistory } from "react-router-dom";
import React from "react";
import { IsLoggedIn, LogoutPost } from "../api/Auth";

export default function Logout() {
  const { dispatch } = useContext(AppContext);
  const [message, setMessage] = useState("Logging Out")
  const history = useHistory();
  
  useEffect(() => {
    dispatch({type: 'logout', payload : { user : null}})
    dispatch({type: 'redirect', payload : { active : 'home'}})
    IsLoggedIn()
      .then((res) => {
        LogoutPost()
          .then((res) => {
            setTimeout(() => {
              history.push('/')
            }, 750);
          })
          .catch((err) => {
            setMessage(err.response.data.message)
          })
       })
      .catch((err) => {
        setMessage('Not Logged In : Redirecting Home')
        setTimeout(() => {
          history.push('/')
        }, 1500)
      })
  }, []);

  return (
    <div className="flex justify-center mt-8 font-mono text-2xl">
      {message}
    </div>
  );
}
