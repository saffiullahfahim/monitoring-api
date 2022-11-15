const express = require("express");

const monitorAdd = require("../controllers/addMonitor");
const monitorUpdate = require("../controllers/updateMonitor");
const monitorShow = require("../controllers/showMonitor");

const monitorRouter = express.Router();

monitorRouter.post("/add", monitorAdd);
monitorRouter.post("/update", monitorUpdate);
monitorRouter.post("/", monitorShow);

module.exports = monitorRouter;
