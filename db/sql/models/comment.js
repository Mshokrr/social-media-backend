'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        allowNull: false,
        onDelete: 'CASCADE',
      });
      Comment.belongsTo(models.User, {
        foreignKey: 'username',
        allowNull: false,
        onDelete: 'CASCADE',
      });
    }
  }
  Comment.init(
    {
      text: DataTypes.TEXT,
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Comment',
      tableName: 'Comments',
    },
  );
  return Comment;
};
