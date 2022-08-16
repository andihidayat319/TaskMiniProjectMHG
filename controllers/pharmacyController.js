const {Pharmacy} = require('../models')
class pharmacyController {
  static async getAllItem( req, res, next){
    try {
      const items = await Pharmacy.findAll()
      res.status(200).json(items)
    } catch (error) {
      next(error)
    }
  }
  static async detailItem( req, res, next){
    try {
      const item = await Pharmacy.findByPk(+req.params.id)
      if (!item) throw {name: "Not Found"}
      res.status(200).json(item)
    } catch (error) {
      next(error)
    }
  }
  static async createItem (req, res, next){
    const {name, price, stock } = req.body
    try {
      const newItem = await Pharmacy.create({name, price, stock})
      res.status(201).json({newItem})
    } catch (error) {
      next(error)
    }
  }
  static async updateItem (req, res, next){
    const {name, price, stock } = req.body
    try {
      const item = await Pharmacy.findByPk(+req.params.id)
      if (!item) throw {name: "Not Found"}
      const updateItem = await Pharmacy.update({
            name,
            price,
            stock            
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
      res.status(200).json(updateItem[1][0])
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async deleteItem(req, res, next){
    try {
      const item = await Pharmacy.findByPk(+req.params.id)
      if (!item) throw {name: "Not Found"}
      await item.destroy({
          where: {
              id: req.params.id
          }
      })
      res.status(200).json({"message" : `${item.name} success to delete`})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = pharmacyController