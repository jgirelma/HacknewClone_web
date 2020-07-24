import React, { useReducer, useState, useEffect } from "react";
import { PostCard } from "../Components/PostCard";
import CommentsContext from "../Contexts/CommentsContext";
import Comments from "../Components/Comments";
import { usePost } from "../api/post";
import { useParams } from "react-router-dom";
import OrderReducer from "../Reducers/OrderReducer";

export default function Post() {
  const { id } = useParams();
  const { post } = usePost(id);
  const [roots, setRoots] = useState([])
  const [ready, setReady] = useState(false)
  const [comments, setComments] = useState({})
  const [reloadComments, setReloadComments] = useState(null)

  const [order, orderDispatch] = useReducer(OrderReducer, "Newest")

  const state = {
    id,
    comments,
    setComments,
    roots,
    setRoots,
    ready,
    setReady,
    reloadComments,
    setReloadComments,
    order,
    orderDispatch
  };

  
  return (
    <CommentsContext.Provider value={{ state }}>
    <div className="font-mono container mx-auto my-8">
        <div className="bg-white rounded">
          {!post ? (
            <div></div>
          ) : (
            <PostCard myPost={post} noTruncate></PostCard>
          )}
          
        </div>
          <Comments></Comments>
      </div>
    </CommentsContext.Provider>
  );
}
