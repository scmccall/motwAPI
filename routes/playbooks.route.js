const express = require("express");
const playbookRoute = express.Router();
const playbooks = require("../playbooks.json");

playbookRoute.route("/").get((req, res) => {
  res.json(playbooks);
});

module.exports = playbookRoute;