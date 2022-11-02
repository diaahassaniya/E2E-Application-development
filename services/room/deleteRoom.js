const models = require("../../sequelize/models");

const deleteRoom = async (id) => {
  try {
    return await models.room.update({ is_active: 0 }, { where: { id: id } });
  } catch (err) {
    throw err;
  }
};
module.exports = { deleteRoom };
