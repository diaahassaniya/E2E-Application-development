const { DataTypes, HasMany } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {},
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i,
        default: false,
      },
      role_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "role",
          key: "id",
        },
      },
    },
    {
      tableName: "users",
      createdAt: false,
      updatedAt: false,
    }
  );
  users.associate = (models) => {
    users.belongsTo(models.role, { foreignKey: "role_id" });
    users.belongsToMany(models.camera, {
      through: "user_camera",
      foreignKey: "user_id",
    });
  };
  return users;
};
