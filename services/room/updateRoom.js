const models = require("../../sequelize/models");

const updateRoom = async (req) => {
  try {
    await models.room.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
  } catch (err) {
    throw err;
  }
};
module.exports = { updateRoom };
