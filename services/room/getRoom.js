const models = require("../../sequelize/models");

const getRoom = async (id) => {
  try {
    return await models.room.findByPk(id);
  } catch (err) {
    throw err;
  }
};
module.exports = { getRoom };
