const Headers = (body: unknown) => {
  if (body instanceof FormData) return {};
  if (typeof body === "object") return { "Content-Type": "application/json" };
  if (typeof body === "string") return { "Content-Type": "text/plain" };
  return {};
};

export default Headers;
