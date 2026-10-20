// Fictional sample app for testing the SBS portal. Not real code.
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from sbs-sample");
});

server.listen(3000);
