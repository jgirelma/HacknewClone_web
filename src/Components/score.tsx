import React, { useContext } from "react";
import PostContext from "../Contexts/PostContext";

export function PostScore() {
  const { post } = useContext(PostContext)
  return (
    <div className="text-sm text-gray-900">
      {post.score} {post.score === 1 ? 'point' : 'points'}
    </div>
  )
}

export function CommentScore({score } : { score : number}) {
  return (
    <div className="text-sm text-gray-900">
      {score} {score === 1 ? 'point' : 'points'}
    </div>
  )
}