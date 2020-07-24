export type User = {
  firstname: string,
  lastname: string,
  id: number,
  email: string
}

export interface State {
  user: User | null,
  page: number,
  active: string,
}

export interface ContextType {
  state: State,
  dispatch: React.Dispatch<any>
}

export type ActionType = {
  type: string,
  payload: any,
}

export type Post = {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}