import React, { useContext, useEffect } from "react";
import Comment from "./Comment";
import { SortSelectorForComments } from "./SortSelector";
import CommentsContext from "../Contexts/CommentsContext";
import { useComments } from "../api/comments";
import { useParams } from "react-router-dom";

export default function Comments() {
  const { state } = useContext(CommentsContext);
  const { id } = useParams();
  const { trigger } = useComments(id);

  useEffect(() => {
    state.setReloadComments(() => () => {
      state.setReady(false);
      trigger();
    });
  }, []);

  if (!state.ready) {
    return <div></div>;
  }

  if (state.roots.length === 0) {
    return (
      <>
        <SortSelectorForComments></SortSelectorForComments>
        <div className="text-lg p-4 flex justify-center">No Comments</div>
      </>
    );
  }

  return (
    <>
      <SortSelectorForComments></SortSelectorForComments>
      <div className="mt-4 p-4 comments bg-white rounded">
        <div>
          {state.roots.map((c: any) => {
            return <Comment key={c.id} commentId={c.id}></Comment>;
          })}
        </div>
      </div>
    </>
  );
}
