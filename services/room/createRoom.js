const models = require("../../sequelize/models");

const CreateRoom = async (req) => {
  req.body.is_active = 1;
  try {
    await models.room.create(req.body);
  } catch (err) {
    throw err;
  }
};
module.exports = { CreateRoom };
