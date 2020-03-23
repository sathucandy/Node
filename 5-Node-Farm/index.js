const url = require("url");
const http = require("http");
const fs = require("fs");

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

///  WE READ THE FILE HERE INSTEAD OF "/api" BECAUSE HERE WE ARE READING
// THE FILE ONLY ONCE AND CAN CALL DATA AS MANY TIME AS THE API IS HIT
// INSTEAD OF READING THE DATA EVERYTIME WHEN THE API IS HIT AND THEN DISPLAYING IT
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);
// console.log(dataObject);
// Implementing Slugify
const slugs = dataObject.map(element => {
  return slugify(element.productName, { lower: true });
});

console.log(slugs);

const server = http.createServer((req, res) => {
  // console.log(req.url);
  // console.log(url.parse(req.url, true)); // Here we are righting true to parse the query string as object.

  const { query, pathname } = url.parse(req.url, true);

  // implementing routing
  // const pathName = req.url;

  ////OVERVIEW PAGE////
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObject
      .map(element => {
        return replaceTemplate(tempCard, element);
      })
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    console.log(cardsHtml);
    res.end(output);
  }
  //// PRODUCT PAGE ////
  else if (pathname === "/product") {
    // console.log(query);
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  /// API ////
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  //// NOT FOUND////
  else {
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
