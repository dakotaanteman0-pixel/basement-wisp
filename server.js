
const http = require("node:http");
const { server: wisp } =
  require("@mercuryworkshop/wisp-js/server");

const port = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    });
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

  if (pathname !== "/wisp/") {
    socket.destroy();
    return;
  }

  wisp.routeRequest(req, socket, head);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Basement Wisp listening on ${port}`);
});
