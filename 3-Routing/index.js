const url = require("url");
const http = require("http");

const server = http.createServer((req, res) => {
  //   console.log(req.url);

  // implementing routing
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview");
  } else if (pathName === "/product") {
    res.end("This is the product");
  } else {
    // ALWAYS SEND HEADER BEFORE RESPONSE
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello World"
    });
    res.end("<h1>Page not found</h1>");
  }

  res.end("Greetings from the server");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server running");
});
