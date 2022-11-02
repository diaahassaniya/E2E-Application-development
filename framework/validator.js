const { check } = require("express-validator");

exports.updateRoomValidator = () => {
  return [
    check("name").isString().withMessage("name should be string"),
    check("id").isInt().withMessage("id should be integer"),
    check("name").notEmpty().withMessage("name is required"),
    check("id").notEmpty().withMessage("id is required"),
  ];
};

exports.createRoomValidator = () => {
  return [
    check("name").isString().withMessage("name should be string"),
    check("name").notEmpty().withMessage("name is required"),
  ];
};

exports.updateCameraValidator = () => {
  return [
    check("id").isInt().withMessage("id should be integer"),
    check("id").notEmpty().withMessage("id is required"),
    check("name").isString().withMessage("name should be string"),
    check("name").notEmpty().withMessage("name is required"),
    check("connected").isInt().isBoolean().withMessage("id should be 0 or 1"),
    check("connected").notEmpty().withMessage("connected is required"),
    check("room_id").notEmpty().withMessage("roomId is required"),
    check("room_id").isInt().withMessage("room id should be integer"),
  ];
};

exports.createCameraValidator = () => {
  return [
    check("name").isString().withMessage("name should be string"),
    check("name").notEmpty().withMessage("name is required"),
    check("connected")
      .isInt()
      .isBoolean()
      .withMessage("connected should be boolean"),
    check("connected").notEmpty().withMessage("connected is required"),
    check("room_id").isInt().withMessage("room id should be integer"),
    check("room_id").notEmpty().withMessage("roomId is required"),
  ];
};

exports.idValidator = () => {
  return [
    check("id").isInt().withMessage("id should be integer"),
    check("id").notEmpty().withMessage("id is required"),
  ];
};

exports.userValidator = () => {
  return [
    check("email").isEmail().withMessage("email should valid"),
    check("email").notEmpty().withMessage("email is required"),
    check("password").isString().withMessage("password should be string"),
    check("password").notEmpty().withMessage("password is required"),
  ];
};

exports.assignCameraValidator = () => {
  return [
    check("user_id").isInt().withMessage("user_id should be integer"),
    check("user_id").notEmpty().withMessage("user_id is required"),
    check("camera_id").isInt().withMessage("camera_id should be integer"),
    check("camera_id").notEmpty().withMessage("camera_id is required"),
  ];
};

exports.permistion = () => {
  return [
    check("role").isInt().withMessage("role should be string"),
    check("role").notEmpty().withMessage("role is required"),
  ];
};
