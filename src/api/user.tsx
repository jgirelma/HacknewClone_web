import Axios from "axios";

export async function getUser(id: number) {
  try {
    const { data } = await Axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/${id}`);
    return data.user;
  } catch (err) {
    return { err: "no user found" };
  }
}
