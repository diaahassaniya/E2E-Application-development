const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  next();
};

const validUser = (req, res, next) => {
  if (!req.session.sessionID)
    return res.status(401).send({ message: "please login" });

  next();
};

const validAdmin = (req, res, next) =>{
    if(req.session.role !== 1)
      return res.status(401).send({ message: "Only admins can update the permission of the user" });
      next();
    
}

module.exports = { validateRequest, validUser, validAdmin };
