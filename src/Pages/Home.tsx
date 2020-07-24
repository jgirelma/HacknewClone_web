import React, { useReducer, useContext } from "react";
import {  usePosts } from "../api/posts";
import SortSelector from "../Components/SortSelector";
import HomeReducer from "../Reducers/HomeReducer";
import HomeContext from "../Contexts/Home";
import Posts from "../Components/Posts";

export default function Home() {
  const [state, dispatch]= useReducer(HomeReducer, {page: 1, order: 'Newest'})

  return (
    <HomeContext.Provider value={{state, dispatch}}>
      <HomePage></HomePage>
    </HomeContext.Provider>
  )
}

function HomePage() {
  const { state, dispatch } = useContext(HomeContext)
  const { posts, loading, error }  = usePosts();
  
  if (loading) {
    return <div className=""></div>
  }


  if (!!error)  {
    return <div className="">{error.status}</div>
  }

  return (
    <>
      <SortSelector context={HomeContext}></SortSelector>
      <Posts posts={posts}></Posts>
      <div
        className={`font-mono text-lg container mx-auto controls-bottom flex ${
          state.page === 1
            ? "justify-end"
            : posts.length !== 15
            ? "justify-start"
            : "justify-between"
        } `}
      >
        <button
          onClick={() => dispatch({ type: "lastPage" })}
          className={`hover:border-b border-green-400 ${
            state.page === 1 && "hidden"
          }`}
        >
          Previous Page
        </button>
        <button
          onClick={() => dispatch({ type: "nextPage" })}
          className={`hover:border-b border-green-400 ${
            posts.length !== 15 && "hidden"
          }`}
        >
          Next Page
        </button>
      </div>
    </>
  );
}
