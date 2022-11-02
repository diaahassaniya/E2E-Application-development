const models = require("../../sequelize/models");

const getCamera = async (camId) => {
  try {
    return await models.camera.findByPk({
      where: {
        id: camId,
        is_active: 1,
      },
    });
  } catch (err) {
    throw err;
  }
};
module.exports = { getCamera };
