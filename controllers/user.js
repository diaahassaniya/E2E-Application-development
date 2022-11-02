const express = require("express"),
  router = express.Router(),
  service = require("../services/login"),
  assignService = require("../services/users/assignCamera"),
  userService = require("../services/users/user"),
  registerService = require("../services/registration"),
  deleteAccessServie = require("../services/users/deleteUserAccess"),
  permistionService = require("../services/users/permistion"),
  UnassignedCamerasService = require("../services/users/unassignedCameras"),
  {
    userValidator,
    assignCameraValidator,
    permistion,
  } = require("../framework/validator"),
  { validateRequest } = require("../framework/helper"),
   {validAdmin} =require("../framework/helper");
/**
 * get all users
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method Get
 * 	url /api/users
 */

router.get("/users", async (req, res) => {
  try {
    const result = await userService.getUsers();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

/**
 * get unassigned user cameras from any room
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method Get
 * 	url /api/unassigned-cameras/:id
 */

router.get("/unassigned-cameras/:id", async (req, res) => {
  try {
    console.log("req.params", req.params);
    const result = await UnassignedCamerasService.getUnassignedUserCameras(
      req.params.id
    );
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

/**
 * assign camera to user
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method Post
 * 	url /api/camera-user
 */

router.post(
  "/camera-user",
  assignCameraValidator(),
  validateRequest,
  async (req, res) => {
    try {
      await assignService.assignCameraToUser(req);
      return res.status(200).send("user assigned successfully ");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

/**
 * assign camera to user
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method Post
 * 	url /api/camera-user
 */

router.post(
  "/permistion",
  assignCameraValidator(), permistion(),validateRequest, validAdmin,
  async (req, res) => {
    try {
      await permistionService.updatePermission(req);
      return res.status(200).send("permistion updated successfully ");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

/**
 * delete camera that the user have
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method delete
 * 	url /api/camera-user
 */

router.delete(
  "/camera-user",
  assignCameraValidator(),
  validateRequest,
  async (req, res) => {
    try {
      const result = await deleteAccessServie.deleteUserAccess(req);
      return res.status(200).send(`${result} camera deleted`);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

/**
 * Register a new user
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method Post
 * 	url /api/register
 */

router.post("/register", userValidator(), validateRequest, async (req, res) => {
  try {
    await registerService.createUser(req);
    return res.status(201).send("user created successfully ");
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

/**
 * login
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method Post
 * 	url /api/register
 */

router.post("/login", userValidator(), validateRequest, async (req, res) => {
  try {
    const result = await service.login(req);
    req.session.sessionID = req.sessionID;
    req.session.role = result.dataValues.role_id;
    req.session.userId = result.dataValues.id;

    return res.status(200).send({ role: req.session.role });
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
});


/**
 * logout
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method Post
 * 	url /api/logout
 */

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("logout has issues");
    } else {
      res.clearCookie("connect.sid", { path: "/" });
      return res.status(200).send("logout sucessfully");
    }
  });
});

module.exports = router;
