import type { fetchDataProps, useFetchProps, useResults } from "@/types";
import UltraFetchError from "@/shared/UltraFetchError";
import { useCallback, useState } from "react";
import Methods from "@/methods";

const METHODS = ["POST", "GET", "DEL", "PUT"] as const;

const useFetch = <T, E = unknown>(url: string): useFetchProps<T, E> => {
  const URL_SOME = ["http://", "https://"].some((u) => url.startsWith(u));
  if (!url || typeof url !== "string" || !URL_SOME) {
    throw new UltraFetchError(
      "URL is required and must be a non-empty string.",
    );
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<E | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(
    async (options?: fetchDataProps) => {
      const opts = options ?? {};

      const body = opts.body;
      const headers = opts.headers ?? {};
      const cookie = opts.cookie ?? false;
      const method = opts.method ?? "POST";

      setLoading(true);
      setError(null);

      const client = new Methods(url);
      let results: useResults<T, E>;

      try {
        switch (method) {
          case "POST":
            results = await client.Post<T, E>({ headers, body, cookie });
            break;
          default: {
            const text = `Unsupported HTTP method: "${method}". Supported methods: ${METHODS.join(", ")}.`;
            throw new UltraFetchError(text);
          }
        }

        if (results.success) {
          setData(results.data ?? null);
        } else {
          setError(results.error ?? null);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message as unknown as E);
      } finally {
        setLoading(false);
      }
    },
    [url],
  );

  return { loading, error, data, fetchData };
};

export { useFetch };
