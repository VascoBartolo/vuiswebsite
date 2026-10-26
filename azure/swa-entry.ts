// Replaces Nitro's azure-swa entry, which builds a Request from a relative URL
// (Node rejects it) and hands Azure a stream body.
import "#nitro/virtual/polyfills";
import { useNitroApp } from "nitro/app";

type AzureRequest = {
  method?: string;
  url?: string;
  headers: Record<string, string>;
  params: { url?: string };
  bufferBody?: Buffer;
  rawBody?: string;
};

const nitroApp = useNitroApp();

export async function handle(
  context: { res?: unknown },
  req: AzureRequest,
) {
  const url = new URL(
    req.headers["x-ms-original-url"] ?? `/api/${req.params.url ?? ""}`,
    req.url ?? "http://localhost",
  );
  const method = req.method ?? "GET";
  const hasBody = method !== "GET" && method !== "HEAD";

  const response = await nitroApp.fetch(
    new Request(url, {
      method,
      headers: req.headers,
      body: hasBody ? (req.bufferBody ?? req.rawBody) : undefined,
    }),
  );

  // shortcut: Set-Cookie headers are dropped; the server sets none today, port Nitro's getAzureParsedCookiesFromHeaders if that changes
  context.res = {
    status: response.status,
    body: Buffer.from(await response.arrayBuffer()),
    headers: Object.fromEntries(
      [...response.headers.entries()].filter(([key]) => key !== "set-cookie"),
    ),
  };
}
