module.exports = function (sequelize, DataTypes) {
  let category = sequelize.define("category", {
    id: { 
      type: DataTypes.UUID, 
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    name: DataTypes.STRING
  }, {
    tableName: 'category'
  });
  return category;
}