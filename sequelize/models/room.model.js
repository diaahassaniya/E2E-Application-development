const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      is_active: {
        allowNull: false,
      type: DataTypes.INTEGER,
      default:1
      },
    },
    {
      tableName: 'room',
      createdAt: false,
      updatedAt: false,
    },
  );
  room.associate = (models) => {
    room.hasMany(models.camera, {foreignKey: 'room_id'});
    }
    return room;
};
