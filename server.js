const express = require("express");
const app = express();

// Add routes
app.use("/api/v1", require("./routes/api"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;