import React, { useState, useContext } from "react";
import CommentsContext from "../Contexts/CommentsContext";

export default function SortSelector({context} : any) {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(context);

  return (
    <div className="container mx-auto mt-4 font-mono text-sm md:text-base">
      <div className="flex justify-between md:justify-start items-start md:w-1/6">
        <h1 className="bg-white rounded px-4 py-2">Order By:</h1>
        <div className="md:absolute px-4 py-2 md:ml-32 bg-white rounded w-40 md:hover:border-2">
          {!open ? (
            <div onClick={() => setOpen(!open)} className="">
              {state.order}
            </div>
          ) : (
            <div className="divide-y">
              <div
                onClick={() => {
                  dispatch({ type: "newest" });
                  setOpen(!open);
                }}
                className=""
              >
                {state.order}
              </div>
              <div
                onClick={() => {
                  dispatch({ type: "newest" });
                  setOpen(!open);
                }}
              >
                Newest
              </div>
              <div
                onClick={() => {
                  dispatch({ type: "day" });
                  setOpen(!open);
                }}
              >
                Top: 1 Day
              </div>
              <div
                onClick={() => {
                  dispatch({ type: "week" });
                  setOpen(!open);
                }}
              >
                Top: 1 Week
              </div>
              <div
                onClick={() => {
                  dispatch({ type: "month" });
                  setOpen(!open);
                }}
              >
                Top: 1 Month
              </div>
              <div
                onClick={() => {
                  dispatch({ type: "all" });
                  setOpen(!open);
                }}
              >
                Top: All
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SortSelectorForComments() {
  const [open, setOpen] = useState(false);
  const { state } = useContext(CommentsContext);

  return (
    <div className="container mx-auto mt-4 font-mono text-sm md:text-base">
      <div className="flex justify-between md:justify-start items-start md:w-1/6">
        <div className="bg-white rounded px-4 py-2">Order By:</div>
        <div className="md:absolute px-4 py-2 ml-32 bg-white rounded w-40 md:hover:border-2">
          {!open ? (
            <div onClick={() => setOpen(!open)} className="">
              {state.order}
            </div>
          ) : (
            <div className="divide-y">
              <div
                onClick={() => {
                  state.orderDispatch({ type: "newest" });
                  setOpen(!open);
                }}
                className=""
              >
                {state.order}
              </div>
              <div
                onClick={() => {
                  state.orderDispatch({ type: "newest" });
                  setOpen(!open);
                }}
              >
                Newest
              </div>
              <div
                onClick={() => {
                  state.orderDispatch({ type: "day" });
                  setOpen(!open);
                }}
              >
                Top: 1 Day
              </div>
              <div
                onClick={() => {
                  state.orderDispatch({ type: "week" });
                  setOpen(!open);
                }}
              >
                Top: 1 Week
              </div>
              <div
                onClick={() => {
                  state.orderDispatch({ type: "month" });
                  setOpen(!open);
                }}
              >
                Top: 1 Month
              </div>
              <div
                onClick={() => {
                  state.orderDispatch({ type: "all" });
                  setOpen(!open);
                }}
              >
                Top: All
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}