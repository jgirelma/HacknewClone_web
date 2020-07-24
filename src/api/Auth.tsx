import * as ax from "axios";
import useQuery from "./useQuery";
import { useContext } from "react";
import AppContext from "../Contexts/AppContext";

const axios = ax.default;

function useIsLoggedIn() {
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user`)
}

export { useIsLoggedIn as IsLoggedIn };

async function Login(data : any) {
  return axios.post(`${process.env.REACT_APP_SERVER_URL}api/login`, data)
}

export { Login as LoginPost }

export default async function Logout() {
  return axios.post(`${process.env.REACT_APP_SERVER_URL}api/logout`)
}

export { Logout as LogoutPost }

async function Register(data : any) {
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/api/register`, data)
}

export { Register as RegisterPost }

export const useLoggedIn = () => {
  const { dispatch } = useContext(AppContext)

  const { data, loading } = useQuery({
    method: 'post',
    url: `${process.env.REACT_APP_SERVER_URL}/api/user`,
    initialValues: {error: '', data: {}},
    callback:{
      resolve: (res) => {
        dispatch({type:"login", payload: { user: res.data.user }})
      },
      reject: () => {},
    },
  })

  return { data, loading }
}