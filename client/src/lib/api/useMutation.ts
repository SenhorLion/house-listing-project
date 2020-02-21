import { useState, useReducer } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type MutationTuple<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  State<TData>
];

type Action<TData> =
  | {
      type: "FETCH";
    }
  | {
      type: "FETCH_SUCCESS";
      payload: TData;
    }
  | {
      type: "FETCH_ERROR";
    };

const reducer = <TData>() => (state: State<TData>, action: Action<TData>) => {
  switch (action.type) {
    case "FETCH":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { data: action.payload, loading: false, error: false };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    default:
      throw new Error();
  }
};
// steps:

// useMutation function: accepts query: string and typed with TData, TVariables types
//useState to State interface
// fetch method, accepts variables
// => calls server.fetch with both query and variables
// => try/catch to handle errors
export const useMutation = <TData = any, TVariables = any>(
  query: string
): MutationTuple<TData, TVariables> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false
  });

  const fetch = async (variables?: TVariables) => {
    try {
      dispatch({ type: "FETCH" });
      // handle delete
      const { data, errors } = await server.fetch<TData, TVariables>({
        query,
        variables
      });

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }

      dispatch({
        type: "FETCH_SUCCESS",
        payload: data
      });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
      throw console.error(error);
    }
  };

  return [fetch, state];
};
