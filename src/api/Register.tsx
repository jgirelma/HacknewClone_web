import * as ax from 'axios'

const axios = ax.default

export default async function Register(data : any) {
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, data)
}

export { Register as RegisterPost }