import { serve } from "https://deno.land/std@0.205.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.205.0/http/file_server.ts";

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const filePath = `${Deno.cwd()}/public${url.pathname}`;

  try {
    return await serveFile(req, filePath);
  } catch {
    return new Response("File Not Found", { status: 404 });
  }
};

console.log("Listening on http://localhost:8000/");
serve(handler, { port: 8000 });