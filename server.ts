import { serveDir } from "jsr:@std/http@1";

Deno.serve((request) => {
  const url = new URL(request.url);
  return serveDir(request, { fsRoot: "./doc", urlRoot: "" });
});