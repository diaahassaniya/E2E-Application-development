const models = require('../../sequelize/models');
const { Op } = require('sequelize');

const getUnassignedUserCameras = async (userId) => {
    console.log("userId" , userId)
  try {
 

    const response = await models.user_camera.findAll({
      attributes: ['camera_id'],
      where:{
        user_id: userId
      }
    });
    let cameraIds;
    if(response){
      console.log("i'm here")
      cameraIds = response.map((val) =>{
        return val.camera_id
      // console.log('val.datavalues.camera_id', val.camera_id)
    });
    console.log('cameraIdsasd', cameraIds)
    }
     
    // cameraIds();
    console.log('cameraIds', cameraIds)
      const cameras = await models.camera.findAll({
        where:{
          id: {[Op.notIn]:cameraIds}
        }
      })
    console.log('cameras', cameras)
          return cameras;
  } catch (err) {
    throw err;
  }
};
module.exports = { getUnassignedUserCameras };

