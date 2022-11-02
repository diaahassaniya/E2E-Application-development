const models = require("../../sequelize/models");

const getRooms = async () => {
  try {
    return await models.room.findAll({
      where: {
        is_active: 1,
      },
    });
  } catch (err) {
    throw err;
  }
};
module.exports = { getRooms };
