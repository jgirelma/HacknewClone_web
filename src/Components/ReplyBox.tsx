import { useState, useContext, useEffect } from "react";
import React from "react";
import AppContext from "../Contexts/AppContext";
import { useLocation, Redirect } from "react-router-dom";
import CommentsContext from "../Contexts/CommentsContext";
import { useSubmitComment } from "../api/comment";
import { VoteComment } from "./vote";

export default function ReplyBox({ commentId, setScore }: any) {
  const [open, setOpen] = useState(false);

  if (open) {
    return <OpenReplyBox commentId={commentId} setOpen={setOpen} />;
  } else {
    return (
      <ClosedReplyBox
        commentId={commentId}
        setOpen={setOpen}
        setScore={setScore}
      />
    );
  }
}

function ClosedReplyBox({ setOpen, commentId, setScore }: any) {
  return (
    <div className="flex">
      <button onClick={() => setOpen(true)} className="text-gray-700 text-xs">
        <span className="hover:border-b border-green-400">Reply</span>
      </button>
      <span style={{ position: "relative", top: "-4px" }} className="ml-1 mt-1">
        .
      </span>
      <div className="mt-1">
        <VoteComment comment_id={commentId} setScore={setScore}></VoteComment>
      </div>
    </div>
  );
}

function OpenReplyBox({ setOpen, commentId }: any) {
  const location = useLocation();
  const [reply, setReply] = useState("");
  const { state } = useContext(AppContext);
  const CommentsCtx = useContext(CommentsContext);
  const id = CommentsCtx.state.id;
  const { sendReply, setParams } = useSubmitComment();

  if (!!state.user) {
    return (
      <div className="">
        <textarea
          className="p-1 w-full appearance-none border border-gray-200"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Enter Your Reply Here"
        ></textarea>
        <div className="divide-x flex content-center items-center mt-2">
          <button
            onClick={() => {
              setParams({
                post_id: id,
                parent_id: commentId,
                body: reply,
              });
              sendReply();
            }}
            className="text-gray-700 text-xs"
          >
            <span className="hover:border-b border-green-400">Send Reply</span>
          </button>
          <button
            onClick={() => setOpen(false)}
            className="ml-2 pl-2 text-gray-700 text-xs h"
          >
            <span className="hover:border-b border-green-400">
              Cancel Reply
            </span>
          </button>
        </div>
      </div>
    );
  } else {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }
}
