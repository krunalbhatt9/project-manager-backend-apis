const express = require("express");
const app = express();

var indexRouter = require('./app/routes/index');

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Hello World." });
// });

app.use("/", indexRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;