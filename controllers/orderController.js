const {Order, Payment, sequelize} = require('../models')
class orderController {
  static async createOrder (req, res, next){
    const { count } = req.body
    const id = +req.params.id
    const t = await sequelize.transaction();
    try {
      console.log(id);
      const newOrder = await Order.create({drugId: id, count},{transaction: t})
      const newPayment = await Payment.create({orderId: newOrder.id, status: 'pending'},{transaction: t})
      await t.commit()
      res.status(201).json({newOrder, newPayment})
    } catch (error) {
      await t.rollback()
      console.log(error);
      next(error)
    }
  }
  static async getPharmacyOrderStatus (req, res, next){
    try {
      const Orders = await Order.findAll({include: Payment})
      res.status(200).json(Orders)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = orderController