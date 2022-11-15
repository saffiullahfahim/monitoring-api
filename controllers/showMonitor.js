const Monitor = require("../models/Monitor");

const monitor = async (req, res) => {
  const result = await Monitor.find().sort();

  res.status(200).send({
    result
  });
};

module.exports = monitor;
