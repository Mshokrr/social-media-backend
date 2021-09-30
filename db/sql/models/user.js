'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'username',
        allowNull: false,
        onDelete: 'CASCADE',
      });
      User.belongsToMany(models.Post, {
        through: models.PostLike,
        foreignKey: 'username',
        onDelete: 'CASCADE',
      });
    }

    toJSON() {
      return {
        username: this.username,
        email: this.email,
        refreshToken: this.refreshToken,
        status: this.status,
        isAdmin: this.isAdmin,
      };
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unqiue: {
          args: true,
          msg: 'Sequelize Validation Error: Username already exists.',
          fields: [sequelize.fn('lower', sequelize.col('username'))],
        },
      },
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unqiue: {
          args: true,
          msg: 'Sequelize Validation Error: Email already exists.',
          fields: [sequelize.fn('lower', sequelize.col('email'))],
        },
        validate: {
          isEmail: {
            args: true,
            msg: 'Sequelize Validation Error: Email format invalid.',
          },
          max: {
            args: 256,
            msg: 'Sequelize Validation Error: Email is longer than 256 characters.',
          },
        },
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('pending', 'active', 'inactive'),
        defaultValue: 'pending',
      },
      profilePicture: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'User',
      tableName: 'Users',
    },
  );
  return User;
};
