'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photo.belongsTo(models.User, { foreignKey: "User_id"})
    }
  }
  Photo.init({
    tittle: DataTypes.STRING,
    caption: DataTypes.STRING,
    image_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};