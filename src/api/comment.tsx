import Axios from "axios";
import { useState, useContext } from "react";
import { useQueryOnCallback } from "./useQuery";
import CommentsContext from "../Contexts/CommentsContext";
import PostContext from "../Contexts/PostContext";

export default async function newComment(data: any) {
  return Axios.post(`${process.env.REACT_APP_SERVER_URL}/api/newcomment`, data);
}

export const useSubmitRootComment = (setOpen : any) => {
  const { state } = useContext(CommentsContext)
  const { post, reply } = useContext(PostContext)

  const { trigger, loading } = useQueryOnCallback({
    initialValues: { error: "", data: {} },
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/api/newcomment`,
    parameters: {post_id: post.id, body:reply},
    callback: {
      resolve: (res) => {
        state.reloadComments()
        setOpen(false)
      },
      reject: () => {
      },
    },
  });

  return { sendReply: trigger, loading };
};

export const useSubmitComment = () => {
  const { state } = useContext(CommentsContext);
  const [params, setParams] = useState({
    post_id: 0,
    parent_id: 0,
    body: "",
  });

  const { trigger } = useQueryOnCallback({
    initialValues: { error: "", data: {} },
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/api/newcomment`,
    parameters: params,
    callback: {
      resolve: (res) => {
        state.reloadComments()
      },
      reject: (err) => {
      },
    },
  });

  return { sendReply: trigger, setParams };
};

export const useUpVoteComment = (
  comment_id: number,
  setStatus: any,
  setScore: any
) => {
  const { trigger } = useQueryOnCallback({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/api/comment/upvote`,
    initialValues: { error: "", data: {} },
    parameters: { comment_id },
    callback: {
      resolve: (res) => {
        setStatus(res.data.status);
        setScore(res.data.score);
      },
      reject: (err) => {
      },
    },
  });

  return { upVoteTrigger: trigger };
};

export const useDownVoteComment = (
  comment_id: number,
  setStatus: any,
  setScore: any
) => {
  const { trigger } = useQueryOnCallback({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/api/comment/downvote`,
    initialValues: { error: "", data: {} },
    parameters: { comment_id },
    callback: {
      resolve: (res) => {
        setStatus(res.data.status);
        setScore(res.data.score);
      },
      reject: (err) => {
       
      },
    },
  });

  return { downVoteTrigger: trigger };
};
