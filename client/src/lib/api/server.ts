interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

/**
 * @server - Wraps a fetch request
 * TData: shapes the type of data returned from a request
 * TVariables: type checks the variables being passed into a request
 */
export const server = {
  fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    return res.json() as Promise<{ data: TData }>;
  }
};
