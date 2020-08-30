const express = require("express");
const weaponTagRoute = express.Router();
const weaponTagsList = require("../../data/weapon-tags-list.json");
const weaponTags = require("../../data/weapon-tags/tags");

weaponTagRoute.route("/").get((req, res) => {
  res.json(weaponTagsList);
});

weaponTagRoute.route("/:index").get((req, res) => {
  const index = req.params.index;
  const tagFromIndex = weaponTags.find(tag => tag["index"] == index);
  res.json(tagFromIndex);
});

module.exports = weaponTagRoute;