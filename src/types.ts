// useFetch
interface fetchDataProps {
  method?: "POST" | "GET" | "DEL" | "PUT";
  headers?: Record<string, string>;
  body?: string | FormData | Record<string, unknown>;
  cookie?: boolean;
}

interface useFetchProps<T, E> {
  loading: boolean;
  error: E | null;
  data: T | null;
  fetchData: (options?: fetchDataProps) => void;
}

// useFetch | Results
interface useResults<T = unknown, E = unknown> {
  success: boolean;
  data?: T;
  error?: E;
  status?: number;
}

export type { useFetchProps, fetchDataProps, useResults };

// Methods | POST

interface MethodsPostProps {
  headers?: Record<string, string> | null;
  body?: string | FormData | Record<string, unknown> | undefined;
  cookie?: boolean;
}

export type { MethodsPostProps };
