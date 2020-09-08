const express = require('express');
const router = express.Router();

router.use("/", require("./api/default.route.js"));
router.use("/playbooks", require("./api/playbooks.route"));
router.use("/weapon-tags", require("./api/weapon-tags.route"));

module.exports = router;