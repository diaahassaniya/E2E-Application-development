const models = require('../sequelize/models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = async (req) => {
  try {
    const result = await models.users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (result) throw Error('Please choose another email');

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) throw err;
      req.body.password = hash;
      req.body.role_id = 2;
      models.users.create(req.body);
    });
  } catch (err) {
    throw err;
  }
};
module.exports = { createUser };
