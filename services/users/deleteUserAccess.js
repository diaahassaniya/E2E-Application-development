const models = require('../../sequelize/models');

const deleteUserAccess = async (req) => {
  try {
      return await models.user_camera.destroy({
        where: {
          user_id: req.body.user_id,
          camera_id: req.body.camera_id
        },
      }
      );
    } catch (err) {
    throw err;
  }
};
module.exports = { deleteUserAccess };
