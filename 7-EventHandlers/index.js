const EventEmitter = require("events");
const http = require("http");

// const myEmitter = new EventEmitter(); THIS IS THE CODE TO BE EXECUTED IF WE WERE NOT CREATING A NEW CLASS

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales(); // CODE TO BE EXECUTED IF WE ARE CREATING A CLASS

myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: jonas");
});

myEmitter.on("newSale", stock => {
  console.log(`there are now ${stock} items left in stock`);
});

myEmitter.emit("newSale", 9);
/////////////////////////////////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request recieved");
  res.end("Request recieved");
});

server.on("close", () => {
  console.log("server closed");
});
