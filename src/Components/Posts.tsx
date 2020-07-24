import Post from "./Post";
import React from "react";

export default function Posts({ posts }: any) {
  if (!!posts) {
    return (
      <div className="feed bg-white rounded container mx-auto my-4 flex flex-col divide-y divide-gray-400 font-mono">
        {posts.map((post: any) => (
          <Post key={post.id} myPost={post} noTruncate={false}></Post>
        ))}
      </div>
    );
  } else {
    return <div className="div"></div>;
  }
}
