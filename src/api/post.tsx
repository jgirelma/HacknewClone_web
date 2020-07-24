import Axios from "axios";
import useQuery, { useQueryOnCallback } from "./useQuery";
import { useContext, useState } from "react";
import AppContext from "../Contexts/AppContext";
import { useHistory } from "react-router-dom";
import PostContext from "../Contexts/PostContext";

export default async function getPost(id: any) {
  return Axios.get(`${process.env.REACT_APP_SERVER_URL}/api/post/${id}`);
}

export const useNewPost = () => {
  const [params, setParams] = useState({
    title: "",
    body: "",
  });
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const { trigger, error } = useQueryOnCallback({
    initialValues: { error: "", data: {} },
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/api/newpost`,
    parameters: params,
    callback: {
      resolve: (res) => {
        dispatch({ type: "firstPage" });
        history.push(`/post/${res.data.post.id}`);
      },
      reject: () => {},
    },
  });
  return { error, trigger, setParams };
};

export const usePost = (id: number) => {
  const { data, loading } = useQuery({
    method: "get",
    url: {
      urlMaker: (arr) => `${process.env.REACT_APP_SERVER_URL}/api/post/${arr[0]}`,
      routeParameters: [id.toString()],
    },
    initialValues: { error: "", data: {} },
  });

  return { post: data.post, loading };
};

export const useUpVotePost = (
  post_id: number,
) => {
  const { post, setPost } = useContext(PostContext)
  const { trigger } = useQueryOnCallback({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/api/post/upvote`,
    initialValues: { error: "", data: {} },
    parameters: { post_id },
    callback: {
      resolve: (res) => {
        const newPost = {...post, score : res.data.score, status: res.data.status}
        setPost(newPost);
      },
      reject: (err) => {
      },
    },
  });

  return { upVoteTrigger: trigger };
};

export const useDownVotePost = (
  post_id: number,
) => {
  const { post, setPost } = useContext(PostContext)
  const { trigger } = useQueryOnCallback({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/api/post/downvote`,
    initialValues: { error: "", data: {} },
    parameters: { post_id },
    callback: {
      resolve: (res) => {

        const newPost = {...post, score : res.data.score, status: res.data.status}
        setPost(newPost);
      },
      reject: (err) => {
        
      },
    },
  });

  return { downVoteTrigger: trigger };
};
