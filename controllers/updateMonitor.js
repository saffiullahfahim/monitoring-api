const Monitor = require("../models/Monitor");

const monitor = async (req, res) => {
  const { id } = req.body;
  const result = await Monitor.findByIdAndUpdate(
    id,
    { $inc: { __v: 1 } },
    {
      new: true,
      useFindAndModify: false,
    }
  );

  res.status(200).send({
    id: result._id,
  });

  global.io.emit("monitor", {
    id: result._id,
    data: result,
  });
};

module.exports = monitor;
