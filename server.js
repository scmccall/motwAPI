const express = require("express");
const app = express();



app.get("/testurl", (req, res) => {
  res.send("Test url reached!");
});



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});