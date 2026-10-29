
const http = require("node:http");
const { server: wisp } = require("@mercuryworkshop/wisp-js/server");

const port = Number(process.env.PORT || 80);

const server = http.createServer((req, res) => {
  console.log("HTTP request:", req.method, req.url);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Basement Wisp is online.");
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.on("upgrade", (req, socket, head) => {
  const pathname = new URL(
    req.url || "/",
    "http://localhost"
  ).pathname;

  console.log("WebSocket upgrade:", pathname);

  if (pathname !== "/wisp/") {
    socket.destroy();
    return;
  }

  wisp.routeRequest(req, socket, head);
});

server.on("error", (err) => {
  console.error("Wisp server error:", err);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Basement Wisp listening on ${port}`);
});
