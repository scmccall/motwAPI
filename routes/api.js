const express = require('express');
const router = express.Router();

router.use("/playbooks", require("./api/playbooks.route"));

module.exports = router;