import Axios from "axios";
import { useQueryOnCallback } from "./useQuery";
import { useState, useEffect, useContext } from "react";
import CommentsContext from "../Contexts/CommentsContext";

export default async function getComments(id : any) {
  return Axios.get(`${process.env.REACT_APP_SERVER_URL}/api/comments/${id}`)
}


function createCommentsGraph(commentsArray : any[]) {
  const commentsMap: Map<number, any> = new Map();
      for (let i = 0; i < commentsArray.length; i++) {
        commentsArray[i].kids = [];
        commentsMap.set(commentsArray[i].id, commentsArray[i]);
      }
      const roots: any = [];
      commentsMap.forEach((comment, id, map) => {
        if (!!comment.parent_id) {
          const parentComment = map.get(comment.parent_id);
          parentComment.kids.push(id);
        } else {
          roots.push(comment);
        }
      });
    return [commentsMap, roots]
}

export const useComments = (id : number) => {
  const { state } = useContext(CommentsContext)
  const [order, setOrder] = useState(state.order)
  
  useEffect(() => {
    switch (state.order) {
      case "Newest":
        setOrder("new");
        break;

      case "Top: 1 Day":
        setOrder("day");
        break;

      case "Top: 1 Week":
        setOrder("week");
        break;

      case "Top: 1 Month":
        setOrder("month");
        break;

      case "Top: All":
        setOrder("all");
        break;

      default:
        break;
    }
  }, [state.order]);

  const { trigger } = useQueryOnCallback({
    method: 'get',
    url: {
      urlMaker: (arr) => `${process.env.REACT_APP_SERVER_URL}/api/comments/${arr[0]}?order=${arr[1]}`,
      routeParameters: [id.toString(), order],
    },
    initialValues: { error: '', data: {}},
    callback: {
      resolve: (res) => {
        state.setRoots([])
        const [commentsMap, roots] = createCommentsGraph(res.data.comments)
        state.setComments(commentsMap);
        state.setRoots(roots);
        state.setReady(true)
      },
      reject: () => {}
    },
    dependencies: [order]

  })
  
  
  useEffect(() => {
    trigger()
  }, []) 

  return { trigger }
}