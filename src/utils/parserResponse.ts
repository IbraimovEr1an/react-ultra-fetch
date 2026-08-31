const parserResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type") ?? "";

  const text = await res.text();
  if (!text) return null;

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch (err) {
      return text;
    }
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    return text;
  }
};

export default parserResponse;
