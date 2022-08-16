const {Payment, Order, Pharmacy, sequelize} = require('../models')
class paymentController {
  static async pay (req, res, next){
    const t = await sequelize.transaction();
    try {
      const pay = await Payment.findByPk(+req.params.id)
      const order = await Order.findOne({where: {id: pay.orderId}})
      const item = await Pharmacy.findOne({where: {id: order.drugId}})
      const updateItem = await Pharmacy.update({
        stock: item.stock - order.count           
    }, {
        where: {
            id: item.id
        },
        returning: true
    },{transaction: t})
      const payment = await Payment.update({
        status: 'Success'         
    }, {
        where: {
            id: req.params.id
        },
        returning: true
    },{transaction: t})
      await t.commit()
      res.status(201).json({updateItem, payment})
    } catch (error) {
      await t.rollback()
      console.log(error);
      next(error)
    }
  }
}

module.exports = paymentController