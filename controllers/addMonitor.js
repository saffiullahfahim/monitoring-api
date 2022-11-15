const Monitor = require("../models/Monitor");

const monitor = async (req, res) => {
  const { link } = req.body;
  const newMonitor = new Monitor({
    link,
  });

  const result = await newMonitor.save();

  res.status(200).send({
    id: result._id,
  });

  global.io.emit("monitor", {
    id: result._id,
    data: result
  })
};

module.exports = monitor;
