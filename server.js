const express = require("express");
const app = express();

app.use("/api", require("./routes/api"));

app.get("/testurl", (req, res) => {
  res.send("Test url reached!");
  // res.send(require("./playbooks.json"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;