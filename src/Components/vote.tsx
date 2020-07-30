import React, { useContext, useState } from "react";
import { useUpVotePost, useDownVotePost } from "../api/post";
import { useUpVoteComment, useDownVoteComment } from "../api/comment";
import CommentsContext from "../Contexts/CommentsContext";
import AppContext from "../Contexts/AppContext";
import { useHistory } from "react-router-dom";
import PostContext from "../Contexts/PostContext";

export const VotePost = () => {
  const { state } = useContext(AppContext);
  const { post } = useContext(PostContext)
  const history = useHistory();
  const { upVoteTrigger } = useUpVotePost(post.id);
  const { downVoteTrigger } = useDownVotePost(post.id);

  return (
    <div className="md:ml-2 flex divide-x divide-gray-900">
      <div className="md:pl-2 flex text-mono text-gray-600 text-sm">
        <button
          onClick={() => {
            if (!state.user) history.push("/login");
            upVoteTrigger();
          }}
          className={`${
            post.status === 1 && "text-green-400 "
          } hover:text-green-400`}
        >
          Upvote
        </button>
        <button
          onClick={() => {
            if (!state.user) history.push("/login");
            downVoteTrigger();
          }}
          className={`${
            post.status === -1 && "text-red-400 "
          } ml-2 hover:text-red-400`}
        >
          Downvote
        </button>
      </div>
    </div>
  );
};

export const VoteComment = ({ comment_id, setScore }: any) => {
  const { state } = useContext(AppContext);
  const history = useHistory();
  const { state : { comments } } = useContext(CommentsContext);
  const comment = comments.get(comment_id);
  const [status, setStatus] = useState(comment.status);

  const { upVoteTrigger } = useUpVoteComment(comment_id, setStatus, setScore);
  const { downVoteTrigger } = useDownVoteComment(
    comment_id,
    setStatus,
    setScore
  );

  return (
    <div className="flex divide-x divide-gray-900">
      <div className="pl-2 flex text-mono text-gray-600 text-sm">
        <button
          onClick={() => {
            if (!state.user) history.push("/login");
            upVoteTrigger();
          }}
          className={`${
            status === 1 && "text-green-400 "
          } hover:text-green-400`}
        >
          Upvote
        </button>
        <button
          onClick={() => {
            if (!state.user) history.push("/login");
            downVoteTrigger();
          }}
          className={`${
            status === -1 && "text-red-400 "
          } ml-2 hover:text-red-400`}
        >
          Downvote
        </button>
      </div>
    </div>
  );
};
