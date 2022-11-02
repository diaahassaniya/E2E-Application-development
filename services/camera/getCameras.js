const models = require('../../sequelize/models');
const { Op } = require("sequelize");

//1 ONLY READ 2 R+W
const getCameras = async (req) => {
  try {
    if (req.session.role === 1) {
      return await models.camera.findAll({
        where: {
          is_active: 1,
        },
      });
    } else {

      const response = await models.camera.findAll({
        include: [
          {
            model: models.users,
            attributes: ['id'],
            where: {

              id: req.session.userId,
            },
            through: {
              attributes: ['role'],
            },
          },
        ],
      });


      response.forEach((val) => {
        if (val.users[0].user_camera.dataValues.role)
        val.dataValues = { ...val.dataValues, editConnected: (Buffer.from(val.users[0].user_camera.dataValues.role).readUInt8() & 1) === 1 };

      })
      return response;
    }
  } catch (err) {
    throw err;
  }
};
module.exports = { getCameras };
