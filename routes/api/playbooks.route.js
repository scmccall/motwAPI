const express = require("express");
const playbookRoute = express.Router();
const playbooksList = require("../../data/playbooks-list.json");

playbookRoute.route("/").get((req, res) => {
  res.json(playbooksList);
});

playbookRoute.route("/:index").get((req, res) => {
  const index = req.params.index;
  const playbook = require(`../../data/playbooks/${index}.json`);
  res.json(playbook);
});

module.exports = playbookRoute;