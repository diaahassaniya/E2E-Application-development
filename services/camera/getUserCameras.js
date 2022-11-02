const models = require('../../sequelize/models');

const getUserCameras = async (userId) => {

  try {
    const response = await models.camera.findAll({
      include: [
        {
          model: models.users,
          attributes: ['id'],
          where: {
            id: userId,
          },
          through: {
            attributes: ['role'],
          },
        },
      ],
    });

    response.forEach((val) => {
      if (val.users[0].user_camera.dataValues.role);
      val.dataValues = { ...val.dataValues, editConnected: (Buffer.from(val.users[0].user_camera.dataValues.role).readUInt8() & 1) === 1 };
    })
    return response;
  } catch (err) {
    throw err;
  }
};
module.exports = { getUserCameras };
