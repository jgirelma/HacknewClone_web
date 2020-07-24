import { useState, useEffect } from "react";
import Axios, { AxiosResponse } from "axios";

interface QueryOptions {
  url:
    | string
    | {
        urlMaker: (arr: string[]) => string;
        routeParameters: string[];
      };

  method: "post" | "get";
  initialValues: { error: any; data: any };
  parameters?: any;
  callback?: {
    resolve: (res: AxiosResponse<any>) => void;
    reject: (err: any) => void;
  };
  dependencies?: any[];
}

export default function useQuery(options: QueryOptions) {
  const {
    url,
    method,
    initialValues,
    parameters,
    callback,
    dependencies,
  } = options;

  const [error, setError] = useState(initialValues.error);
  const [data, setData] = useState(initialValues.data);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      Axios({
        method,
        url: typeof url === "string" ? url : url.urlMaker(url.routeParameters),
        data: parameters,
        withCredentials: true,
      })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          callback?.resolve(res);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
          callback?.reject(err);
        });
    },
    !!dependencies ? dependencies : []
  );

  return { error, data, loading };
}

export const useQueryOnCallback = (options: QueryOptions) => {
  const {
    url,
    method,
    initialValues,
    parameters,
    callback,
    dependencies,
  } = options;

  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(initialValues.error);
  const [data, setData] = useState(initialValues.data);
  const [loading, setLoading] = useState(true);

  if (!!dependencies) {
    dependencies.push(counter);
  }

  useEffect(
    () => {
      if (counter > 0) {
        Axios({
          method,
          url:
            typeof url === "string" ? url : url.urlMaker(url.routeParameters),
          data: parameters,
          withCredentials: true,
        })
          .then((res) => {
            setData(res.data);
            setLoading(false);
            callback?.resolve(res);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
            callback?.reject(err);
          });
      }
    },
    !!dependencies ? dependencies : [counter]
  );

  function trigger() {
    setLoading(true)
    setCounter(counter => counter + 1)
  }

  return { error, data, loading, trigger };
};
