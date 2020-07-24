import * as ax from "axios";
import { useContext, useEffect } from "react";
import AppContext from "../Contexts/AppContext";
import { useHistory } from "react-router-dom";

const axios = ax.default;

export default async function useIsLoggedOut() {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();

  async function fetchUser() {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_SERVER_URL}/api/user`,
        withCredentials: true,
        method: 'post',
      })

      if (res.status !== 200) {
        return;
      }

      dispatch({ type: "login", payload: { user: res.data.user } });
      history.push("/");
    } catch (err) {
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
}
