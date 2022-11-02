const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    'role',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING, 
      },
    },
    {
      tableName: 'role',
      createdAt: false,
      updatedAt: false,
    },
  );
  role.associate = (models) => {
    role.hasMany(models.users, {foreignKey: 'role_id'});
    }
    return role;
};
