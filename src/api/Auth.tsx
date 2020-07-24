import * as ax from "axios";
import useQuery from "./useQuery";
import { useContext } from "react";
import AppContext from "../Contexts/AppContext";

const axios = ax.default;

function useIsLoggedIn() {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_SERVER_URL}/api/user`,
    withCredentials: true,
    })
}

export { useIsLoggedIn as IsLoggedIn };

async function Login(data : any) {
  return axios({
    url: `${process.env.REACT_APP_SERVER_URL}/api/login`,
    data,
    withCredentials: true,
    method: 'post',
  })
}

export { Login as LoginPost }

export default async function Logout() {
  return axios({
    url: `${process.env.REACT_APP_SERVER_URL}/api/logout`,
    method: 'post',
    withCredentials: true,
  })
}

export { Logout as LogoutPost }

async function Register(data : any) {
  return axios({
    url: `${process.env.REACT_APP_SERVER_URL}/api/register`,
    method: 'post',
    data,
    withCredentials: true,
  })
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