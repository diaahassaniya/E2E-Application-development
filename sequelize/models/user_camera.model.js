const { DataTypes, BIGINT } = require('sequelize');

module.exports = (sequelize) => {
  const user_camera = sequelize.define(
    'user_camera',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER, 
        references: {
          model: 'users',
          key: 'id'
        }
      },
      camera_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'camera',
          key: 'id'
        }
      },
      role: {
        allowNull: false,
        type: 'BIT(8)',
      },
    },
    {
      tableName: 'user_camera',
      createdAt: false,
      updatedAt: false,
    }
  );
  return user_camera;
};
 