module.exports = function(sequelize, DataTypes) {
  // console.log(DataTypes, 'sequelize')
  return sequelize.define('user', {
    id: { 
      type: DataTypes.UUID, 
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    permission: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defaultValue: 0
    }
  }, {
    tableName: 'user'
  });
}