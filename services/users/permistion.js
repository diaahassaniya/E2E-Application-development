const models = require("../../sequelize/models");

const updatePermission = async (req) => {
  try {
       return await models.user_camera.update(req.body, {
        where: {
          user_id: req.body.user_id,
          camera_id: req.body.camera_id,
        },
      });
 
  } catch (err) {
    throw err;
  }
};
module.exports = { updatePermission };
