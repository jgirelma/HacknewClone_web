import React, { useState, useContext, useEffect } from "react";
import { timeSince } from "../utils";
import { VotePost } from "./vote";
import { PostScore } from "./score";
import PostContext from "../Contexts/PostContext";
import ReplyBoxForPost from "./ReplyBoxForPost";

function truncate(str: string, limit: number) {
  return `${str.slice(0, limit)}...`;
}

export function PostCard({ myPost, noTruncate }: any) {
  const [post, setPost] = useState(myPost);
  const [reply, setReply] = useState("");

  return (
    <PostContext.Provider value={{ post, setPost, reply, setReply }}>
      <PostCardInner noTruncate={noTruncate}></PostCardInner>
    </PostContext.Provider>
  );
}

function PostCardInner({ noTruncate }: { noTruncate: boolean }) {
  const { post } = useContext(PostContext);

  return (
    <>
      <div className="p-4">
        <div className="font-semibold text-xl">{post.title}</div>
        <div className="text-gray-900 mt-2 mb-4 overflow-hidden">
          {noTruncate ? post.body : truncate(post.body, 100)}
        </div>
        <div className="flex flex-col md:flex-row md:items-center text-gray-600 text-sm md:divide-x md:divide-gray-600">
          <div className="md:pr-4">
            Posted by
            <span className="text-green-600 mx-2">
              {post.firstname} {post.lastname}
            </span>
            {timeSince(post.timestamp)} ago
          </div>
          <div className="flex divide-x divide-gray-600 md:flex-none">
            <VotePost />
            <div className="ml-4 pl-4">
              <PostScore></PostScore>
            </div>
          </div>
        </div>
      </div>
      <ReplyBoxForPost />
    </>
  );
}
