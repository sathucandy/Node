const url = require("url");
const http = require("http");
const fs = require("fs");

///  WE READ THE FILE HERE INSTEAD OF "/api" BECAUSE HERE WE ARE READING THE FILE ONLY ONCE AND CAN CALL DATA AS MANY TIME AS THE API IS HIT
// INSTEAD OF READING THE DATA EVERYTIME WHEN THE API IS HIT AND THEN DISPLAYING IT
const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObject = JSON.parse(data);
console.log(dataObject);

const server = http.createServer((req, res) => {
  //   console.log(req.url);

  // implementing routing
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview");
  } else if (pathName === "/product") {
    res.end("This is the product");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
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
