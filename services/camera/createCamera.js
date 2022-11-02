const models = require("../../sequelize/models");

const createCamera = async (req) => {
  try {
    const result = await models.room.findAll({
      where: {
        id: req.body.room_id,
        is_active: 1,
      },
    });

    if (result[0]) {
      req.body.is_active = 1;
      return await models.camera.create(req.body);
    } else {
      throw Error("Room is not exist");
    }
  } catch (err) {
    throw err;
  }
};
module.exports = { createCamera };
