import Body from "@/utils/body";
import Headers from "@/utils/headers";
import parserResponse from "@/utils/parserResponse";
import type { MethodsPostProps, useResults } from "@/types";

class Methods {
  constructor(public url: string) {}

  async Post<T = unknown, E = unknown>(
    options: MethodsPostProps,
  ): Promise<useResults<T, E>> {
    const fHeaders = { ...Headers(options.body), ...options.headers };
    const fBody = Body(options.body);

    try {
      const res = await fetch(this.url, {
        method: "POST",
        headers: fHeaders,
        ...(fBody === undefined ? {} : { body: fBody }),
        credentials: options.cookie ? "include" : "same-origin",
      });

      const parse = await parserResponse(res);

      if (!res.ok) {
        return { success: false, error: parse as E, status: res.status };
      }

      return { success: res.ok, data: parse as T, status: res.status };
    } catch (err) {
      const message = err instanceof Error ? err.message : "server-error";
      return { success: false, error: message as E };
    }
  }
}

export default Methods;
