import React, { useState, useContext } from "react";
import { timeSince } from "../utils";
import ReplyBox from "./ReplyBox";
import CommentsContext from "../Contexts/CommentsContext";
import { CommentScore } from "./score";

export default function Comment({ commentId }: any) {
  const [open, setOpen] = useState(true);

  if (open) {
    return <OpenComment commentId={commentId} setOpen={setOpen} />;
  } else {
    return <ClosedComment commentId={commentId} setOpen={setOpen} />;
  }
}

function OpenComment({ setOpen, commentId }: any) {
  const { state } = useContext(CommentsContext);
  const [score, setScore] = useState(state.comments.get(commentId).score);
  const comments = state.comments;
  const comment = comments.get(commentId);

  return (
    <div className="mb-2">
      <div className="flex content-center h-4 items-center text-gray-900 text-sm">
        <span className="text-green-600">
          {comment.firstname} {comment.lastname}
        </span>
        <span style={{ position: "relative", top: "-4px" }} className="mx-2">
          .
        </span>
        <span className="text-gray-600">
          {timeSince(comment.timestamp)} ago
        </span>
        <span style={{ position: "relative", top: "-4px" }} className="mx-2">
          .
        </span>
        <CommentScore score={score}></CommentScore>
        <button
          onClick={() => setOpen(false)}
          className="ml-2 text-gray-600 text-xs"
        >
          [Collapse]
        </button>
      </div>
      <div className="text-base mt-2">{comment.body}</div>
      <ReplyBox commentId={commentId} setScore={setScore} />
      <div className="border w-full mt-2"></div>
      <div className="subcomments ml-6 mt-4">
        {comment?.kids?.map((id: any) => {
          return <Comment key={id} commentId={id} />;
        })}
      </div>
    </div>
  );
}

function ClosedComment({ commentId, setOpen }: any) {
  const { state } = useContext(CommentsContext);
  const comments = state.comments;
  const comment = comments.get(commentId);

  return (
    <div className="border-b-2 mb-4 pb-4 flex content-center h-4 items-center text-gray-900 text-sm my-2">
      <span className="text-green-600">
        {comment.firstname} {comment.lastname}
      </span>
      <span style={{ position: "relative", top: "-4px" }} className="mx-2">
        .
      </span>
      <span className="text-gray-600">{timeSince(comment.timestamp)} ago</span>
      <button
        onClick={() => setOpen(true)}
        className="ml-2 text-gray-600 text-xs"
      >
        [Expand]
      </button>
    </div>
  );
}
