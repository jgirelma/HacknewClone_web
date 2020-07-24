import { State, ActionType } from "../types";

export default function AppReducer(state : State, action : ActionType) {
  switch (action.type) {
    case "login": {
      return {...state, ...action.payload }
    }
  
    case "logout":
      return {...state, ...action.payload}
    
    case "redirect":
      return {...state, ...action.payload}
    
    default:
      return state
  }
}