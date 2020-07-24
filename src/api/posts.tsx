import Axios from "axios";
import useQuery from "./useQuery";
import { useContext, useState, useEffect } from "react";
import HomeContext from "../Contexts/Home";

export const usePosts = () => {
  const { state } = useContext(HomeContext);
  const [order, setOrder] = useState("new");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    switch (state.order) {
      case "Newest":
        setOrder("new");
        break;

      case "Top: 1 Day":
        setOrder("day");
        break;

      case "Top: 1 Week":
        setOrder("week");
        break;

      case "Top: 1 Month":
        setOrder("month");
        break;

      case "Top: All":
        setOrder("all");
        break;

      default:
        break;
    }
  }, [state.order]);

  useEffect(() => {
  }, [order]);

  const { loading, error } = useQuery({
    initialValues: { error: "", data: {} },
    method: "get",
    url: {
      urlMaker: (arr) =>
        `${process.env.REACT_APP_SERVER_URL}/api/posts?page=${arr[0]}&order=${order}`,
      routeParameters: [state.page.toString(), order],
    },
    dependencies: [state.page, order],
    callback: {
      resolve: (res) => {
        setPosts(res.data.posts);
      },
      reject: (err) => {
      },
    },
  });
  return { posts, loading, error };
};

export async function newPost(data: any) {
  return Axios.post(`${process.env.REACT_APP_SERVER_URL}/newpost`, data);
}
