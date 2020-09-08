const express = require("express");
const defaultRoute = express.Router();
const defaultList = require("../../data/default.json");

defaultRoute.route("/").get((req, res) => {
  res.json(defaultList);
});


module.exports = defaultRoute;