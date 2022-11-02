const express = require("express"),
  router = express.Router(),
  createService = require("../services/room/createRoom"),
  getRoomService = require("../services/room/getRoom"),
  getRoomsService = require("../services/room/getRooms"),
  deleteRoomService = require("../services/room/deleteRoom"),
  updateRoomService = require("../services/room/updateRoom"),
  { validateRequest } = require("../framework/helper"),
  {
    updateRoomValidator,
    createRoomValidator,
    idValidator,
  } = require("../framework/validator");

/**
 * get a specifc room
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method get
 * 	/room/:id
 */

router.get("/room/:id", idValidator(), validateRequest, async (req, res) => {
  try {
    const result = await getRoomService.getRoom(req.params.id);
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

/**
 * get all Rooms
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method get
 * 	url /api/room
 */

router.get("/room", async (req, res) => {
  try {
    const result = await getRoomsService.getRooms();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

/**
 * create empty room
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method put
 * 	url /api/room
 */

router.post(
  "/room",
  createRoomValidator(),
  validateRequest,
  async (req, res) => {
    try {
      await createService.CreateRoom(req);
      return res.status(201).send("Room created successfully ");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

/**
 * update room info
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method put
 * 	url /api/room
 */

router.put(
  "/room",
  updateRoomValidator(),
  validateRequest,
  async (req, res) => {
    try {
      await updateRoomService.updateRoom(req);
      return res.status(200).send("room updated successfully");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

/**
 * delete  room from rooms
 *
 * @param {Object} req
 * @return success or error
 * @example
 *  method delete
 * 	url /api/room
 */

router.delete("/room", idValidator(), validateRequest, async (req, res) => {
  try {
    const result = await deleteRoomService.deleteRoom(req.body.id);
    return res.status(200).send(`${result} room deleted`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
