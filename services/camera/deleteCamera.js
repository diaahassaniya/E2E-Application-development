const models = require("../../sequelize/models");

const deleteCamera = async (id) => {
  try {
    return await models.camera.update({ is_active: 0 }, { where: { id: id } });
  } catch (err) {
    throw err;
  }
};
module.exports = { deleteCamera };
