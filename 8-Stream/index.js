const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  /* // Solution 1

  fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);                 //THIS APPROACH WORKS FINE BUT NOT PREFFERED AS NODE PROCESS WILL LOAD THE DATA FROM MEMORY
    res.end(data);
  });*/
  // Solution 2: Streams
  //   const readable = fs.createReadStream("testd-file.txt");
  //   readable.on("data", chunk => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });                                                IN THIS READING IS FASTER THAN WRITING
  //   readable.on("error", err => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });
  // SOLUTION 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res); // readableSource.pipe(WritableStream);    BEST SOLUTION
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
