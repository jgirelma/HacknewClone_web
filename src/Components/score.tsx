import React, { useContext } from "react";
import PostContext from "../Contexts/PostContext";

export function PostScore() {
  const { post } = useContext(PostContext)
  return (
    <div className="text-sm text-gray-900">
      {post.score} Points
    </div>
  )
}

export function CommentScore({score } : { score : number}) {
  return (
    <div className="text-sm text-gray-900">
      {score} Points
    </div>
  )
}