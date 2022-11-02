const models = require('../../sequelize/models');

const getUsers = async () => {
  try {
    return await models.users.findAll();
  } catch (err) {
    throw err;
  }
};
module.exports = { getUsers };
