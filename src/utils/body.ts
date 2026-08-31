const Body = (body: unknown) => {
  if (body instanceof FormData || typeof body === "string") return body;
  if (body === null || body === undefined) return undefined;
  return JSON.stringify(body);
};

export default Body;
