'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'username',
        as: 'User',
        allowNull: false,
        onDelete: 'CASCADE',
      });
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        allowNull: false,
        onDelete: 'CASCADE',
      });
      Post.belongsToMany(models.User, {
        through: models.PostLike,
        as: 'PostLikes',
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      text: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Post',
      tableName: 'Posts',
    },
  );
  return Post;
};
