
module.exports = (sequelize, DataTypes) => {
  const camera = sequelize.define(
    'camera',
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
      connected: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        default: false,
      },
      room_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'room',
          key: 'id'
        }
      },
      is_active: {
        allowNull: false,
        type: DataTypes.INTEGER,
        default:1
      },
    },
    {
      tableName: 'camera',
      createdAt: false,
      updatedAt: false,
    },
   
  );
  camera.associate =  (models)=> {
    camera.belongsTo(models.room, {foreignKey: 'room_id'});
    camera.belongsToMany(models.users, { through: 'user_camera', foreignKey: 'camera_id' });
  }
  return camera;
};
