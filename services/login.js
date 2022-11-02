const models = require('../sequelize/models');
const bcrypt = require('bcrypt');

const login = async (req) => {
  try {
    const userPass = req.body.password;
    const result = await models.users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (result) {
      const valid = await bcrypt.compare(userPass, result.dataValues.password);
      if (!valid) throw Error('Please enter valid information');
    } else {
      throw Error('Please enter valid information');
    }

    return result;
  } catch (err) {
    throw err;
  }
};
module.exports = { login };
