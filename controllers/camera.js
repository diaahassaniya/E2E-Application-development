const express = require("express"),
  router = express.Router(),
  createService = require("../services/camera/createCamera"),
  getService = require("../services/camera/getCamera"),
  getCamerasService = require("../services/camera/getCameras"),
  deleteServie = require("../services/camera/deleteCamera"),
  updateService = require("../services/camera/updateCamera"),
  UserCamerasService = require("../services/camera/getUserCameras"),
  {
    idValidator,
    updateCameraValidator,
    createCameraValidator,
  } = require("../framework/validator"),
  { validateRequest } = require("../framework/helper");

/**
 * create a new camera
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method POST
 * 	url /api/camera
 */

router.post(
  "/camera",
  createCameraValidator(),
  validateRequest,
  async (req, res) => {
    try {
      await createService.createCamera(req);
      return res.status(200).send("camera created successfully ");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

/**
 * get a specific camera by id
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method get
 * 	url /api/camera
 */

router.get("/camera/:id", idValidator(), validateRequest, async (req, res) => {
  try {
    const result = await getService.getCamera(req.params.id);
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

/**
 * get all cameras for admin and get only user camera if user
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method get
 * 	url /api/camera
 */

router.get("/camera", async (req, res) => {
  try {
    const result = await getCamerasService.getCameras(req);
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

/**
 * get all cameras for a specific user by his userId
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method get
 * 	url /api/user-camera/:id
 */

router.get("/user-camera/:id", async (req, res) => {
  try {
    const result = await UserCamerasService.getUserCameras(req.params.id);
    console.log
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

/**
 * delete camera
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method delete
 * 	url /api/camera
 */

router.delete("/camera", idValidator(), validateRequest, async (req, res) => {
  try {
    const result = await deleteServie.deleteCamera(req.body.id);
    return res.status(200).send(`${result} camera deleted`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

/**
 * update camera
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method update
 * 	url /api/camera
 */

router.put(
  "/camera",
  updateCameraValidator(),
  validateRequest,
  async (req, res) => {
    try {
      await updateService.updateCamera(req);
      return res.status(200).send("camera updated successfully");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

module.exports = router;
