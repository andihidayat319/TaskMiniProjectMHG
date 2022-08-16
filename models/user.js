'use strict';
const {
  Model
} = require('sequelize');
const {hashingPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "phone number cannot Empty"
        },
        notNull: {
          msg: "phone number cannot null"
        },
        len: {
          args: [10,17],
          msg: "Minimum Length 11 Number and Maximum Length 16 Number"
        },
        isNumeric: true
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['Male', 'Female']]
      }
    },
    dob: {
      type: DataTypes.STRING,
      validate: {
        isDate: true
      }
    },
    ktp:{ 
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        isLength(value) {
          if (value.isLength == 16) {
            throw new Error('Length must 16');
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password cannot Empty"
        },
        notNull: {
          msg: "password cannot null"
        },
        isLength(value) {
          if (value.length < 8) {
            throw new Error('minimum password length 8');
          }
        }
      },
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['patient', 'admin']]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashingPassword(user.password)
  })
  return User;
};