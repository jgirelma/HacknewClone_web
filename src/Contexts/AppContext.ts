import { createContext } from "react";
import { ContextType, State } from "../types";

const initialState: State = {
  user: null,
  active: "posts",
  page: 1,
};

const AppContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

export default AppContext;
