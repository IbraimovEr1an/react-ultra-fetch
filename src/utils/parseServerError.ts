interface parserErrorOptions {
  status: number;
  contentType: string;
  text: string;
}

const isHtmlError = (contentType: string, text: string): boolean => {
  return (
    contentType.includes("text/html") || text.trim().startsWith("<DOCTYPE")
  );
};

const parserServerError = (options: parserErrorOptions): string => {
  if (isHtmlError(options.contentType, options.text)) {
    if (options.status === 404) {
      return "The requested address was not found (404). The URL or route may be invalid.";
    }
    if (options.status >= 500) {
      return `An internal error occurred on the server (${options.status}).`;
    }
    return "Check the backend route or address.";
  }

  return options.text;
};

export default parserServerError;
