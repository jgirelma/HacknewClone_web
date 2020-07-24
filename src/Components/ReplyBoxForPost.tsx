import { useState, useContext } from "react";
import React from "react";
import AppContext from "../Contexts/AppContext";
import { useLocation, Redirect } from "react-router-dom";
import CommentsContext from "../Contexts/CommentsContext";
import { useSubmitRootComment } from "../api/comment";
import PostContext from "../Contexts/PostContext";

export default function ReplyBoxForPost() {
  const [open, setOpen] = useState(false);

  if (open) {
    return <OpenReplyBox setOpen={setOpen} />;
  } else {
    return <ClosedReplyBox setOpen={setOpen} />;
  }
}

function ClosedReplyBox({ setOpen }: any) {
  return (
    <button
      onClick={() => setOpen(true)}
      className="ml-4 mb-4 text-gray-700 text-xs h"
    >
      <span className="hover:border-b border-green-400">Reply</span>
    </button>
  );
}

function OpenReplyBox({ setOpen }: any) {
  const location = useLocation();
  const { state } = useContext(AppContext);

  const {reply, setReply} = useContext(PostContext)

  const { sendReply } = useSubmitRootComment(setOpen)

  if (!!state.user) {
    return (
      <div className="pl-4 pr-4 pb-4">
        <textarea
          className="p-1 w-full appearance-none border border-gray-200"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Enter Your Reply Here"
        ></textarea>
        <div className="divide-x flex content-center items-center mt-2">
          <button
            onClick={() => {
              sendReply()
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
