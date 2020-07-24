import React, { useReducer } from "react";
import AppContext from "./Contexts/AppContext";
import AppReducer from "./Reducers/AppReducer";
import { State } from "./types";
import { AppRouter } from "./Routes";

function App() {

  const initialState : State = {
    user: null,
    active: "posts",
    page: 1,
  }

  console.log(process.env.REACT_APP_SERVER_URL)
  const [state, dispatch] = useReducer(AppReducer, initialState)
  
  return (
      <AppContext.Provider value={{state, dispatch}}>
        <AppRouter/>
      </AppContext.Provider>
  );
}

export default App;
