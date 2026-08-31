declare const REACT_ULTRA_FETCH_CONFIG:
  | {
      baseURL: string | null;
      cookie: boolean;
      headers: Record<string, string>;
    }
  | undefined;

const getUltraFetchConfig = () => {
  if (typeof REACT_ULTRA_FETCH_CONFIG !== "undefined") {
    return REACT_ULTRA_FETCH_CONFIG;
  }

  return { baseURL: null, cookie: false, headers: {} };
};

export { getUltraFetchConfig };
