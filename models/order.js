'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Pharmacy,{
        foreignKey: "drugId"
      }),
      Order.hasOne(models.Payment,{
        foreignKey: 'orderId'
      })
    }
  };
  Order.init({
    drugId: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};