module.exports = function(sequelize, DataTypes) {
  // console.log(DataTypes, 'sequelize')
  return sequelize.define('article', {
    id: { 
      type: DataTypes.UUID, 
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT('tiny'),
    hits: DataTypes.INTEGER,
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false, 
      filed: 'category_id'
    }
  }, {
    tableName: 'article',
    associate: {
      type: 'belongsTo',
      target: 'category',
      options: {
        foreignKey: 'categoryId'
      }
    } 
  });
}