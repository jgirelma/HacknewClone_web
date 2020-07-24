import * as ax from 'axios'

const axios = ax.default

export default async function Register(data : any) {
  return axios({
    url: `${process.env.REACT_APP_SERVER_URL}/register`,
    data,
    withCredentials: true,
    method: 'post',
  })
}

export { Register as RegisterPost }