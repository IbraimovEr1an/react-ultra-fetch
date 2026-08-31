import Body from "@/utils/body";
import Headers from "@/utils/headers";
import parserError from "@/utils/parserError";
import parserResponse from "@/utils/parserResponse";
import type { MethodsPostProps, useResults } from "@/types";
import parserServerError from "./utils/parseServerError";

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

      const clone = res.clone();
      const parse = await parserResponse(res);

      if (!res.ok) {
        const status = res.status;
        const text = await clone.text();
        const contentType = res.headers.get("content-type") ?? "";
        const message = parserServerError({ status, contentType, text });
        return { success: false, error: message as E, status: res.status };
      }

      return { success: res.ok, data: parse as T, status: res.status };
    } catch (err) {
      const message = parserError(err);
      return { success: false, error: message as E };
    }
  }
}

export default Methods;
