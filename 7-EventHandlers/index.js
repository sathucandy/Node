const EventEmitter = require("events");

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
