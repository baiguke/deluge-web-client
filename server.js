const express = require("express");
const next = require("next");
const proxy = require("http-proxy-middleware");
require("dotenv").config();

const url = process.env.DELUGE_HOST;
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const delugeProxyOptions = {
    target: url,
    logLevel: "debug",
    changeOrigin: true,
    secure: false
  };

  server.post("/json", proxy(delugeProxyOptions));

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready for ${dev ? "DEVELOPMENT" : "PRODUCTION"} on http://localhost:${port}`); // eslint-disable-line no-console
  });
});
