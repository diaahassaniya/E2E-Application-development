const models = require('../../sequelize/models');

const assignCameraToUser = async (req) => {
    console.log('req.body', req.body)
    req.body.role = 0;
  try {
    const result = await models.user_camera.findAll({
            where: {
              user_id: req.body.user_id,
              camera_id: req.body.camera_id
            },
          });

          if (!result[0]) {
            return await models.user_camera.create(req.body);
          } else {
            throw Error('user is already assigned to camera');
          }
    } catch (err) {
    throw err;
  }
};
module.exports = { assignCameraToUser };


// const createCamera = async (req) => {
//   try {
//     const result = await models.room.findAll({
//       where: {
//         id: req.body.room_id,
//         is_active: 1
//       },
//     });

//     if (result[0]) {
//       req.body.is_active = 1
//       return await models.camera.create(req.body);
//     } else {
//       throw Error('Room is not exist');
//     }
//   } catch (err) {
//     throw err;
//   }
// };