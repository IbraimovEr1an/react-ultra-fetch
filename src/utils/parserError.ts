const parserError = (err: unknown): string => {
  if (err instanceof DOMException && err.name === "AbortError") {
    return "The request has been canceled or timed out.";
  }

  if (err instanceof TypeError) {
    const msg = err.message.toLowerCase();

    if (msg.includes("failed to fetch")) {
      return "Unable to connect to the server. Check your internet connection or the server address (URL).";
    }

    if (msg.includes("networkerror")) {
      return "A network error has occurred. The server may be down or malfunctioning due to CORS.";
    }

    if (msg.includes("load failed")) {
      return "The request failed. Check the URL or server status.";
    }
  }

  if (err instanceof SyntaxError) {
    return "Unable to read response from server (invalid format).";
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "An unknown error occurred.";
};

export default parserError;
