const models = require('../../sequelize/models');

const updateCamera = async (req) => {
  try {
    const result = await models.room.findAll({
      where: {
        id: req.body.room_id,
        is_active: 1
      },
    });
    console.log(req.session.userId, req.body.id)
    let updatePermission = await models.user_camera.findAll({
      where: {
        user_id: req.session.userId,
        camera_id: req.body.id
      },
    });

    //update on/off on camera
    updatePermission = Buffer.from(updatePermission[0].role).readUInt8() & 1;

    if (result[0] && updatePermission) {
      return await models.camera.update(req.body, {
        where: {
          id: req.body.id,
        },
      });
    } else {
      throw Error('Room is not exist');
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { updateCamera };
