const app = require("./app");
// 4) creating a server in express
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
