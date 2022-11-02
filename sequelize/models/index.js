const { Sequelize, QueryInterface } = require("sequelize");
const keys = require("../../config/db");
var fs = require("fs");
var path = require("path");
var basename = path.basename(module.filename);
var db = {};

var sequelize = new Sequelize(keys.database, keys.user, keys.password, {
  host: keys.host,
  dialect: "mysql",
  logging: console.log,
});

//Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// add the associations between models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const initRolesOfTheUsers = async () => {
  try {
    console.log("adding roles type to role table");
    await sequelize.query("INSERT INTO role VALUES(1,'1')");
    await sequelize.query("INSERT INTO role VALUES(2,'2')");
  } catch (error) {
    console.log("Error is ", error);
  }
};

//Creating the tabels from models
sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    console.log("________________Tables created successfully!________________");
    initRolesOfTheUsers();
  })
  .catch((error) => {
    console.error(`____________Unable to create table : ${error} ____________________`
    );
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
