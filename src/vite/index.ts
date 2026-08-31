import { type Plugin } from "vite";

interface UltraFetchConfigProps {
  url?: string | null;
  cookie?: boolean;
  headers?: Record<string, string>;
}

const ultraFetchConfig = (options: UltraFetchConfigProps): Plugin => {
  return {
    name: "vite-plugin-react-ultra-fetch",
    config() {
      return {
        define: {
          REACT_ULTRA_FETCH_CONFIG: JSON.stringify({
            baseURL: options.url || null,
            cookie: options.cookie || false,
            headers: options.headers || {},
          }),
        },
      };
    },
  };
};

export { ultraFetchConfig };
