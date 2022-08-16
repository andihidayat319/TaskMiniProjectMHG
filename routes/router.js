const router = require('express').Router()
const orderController = require('../controllers/orderController')
const paymentController = require('../controllers/paymentController')
const pharmacyController = require('../controllers/pharmacyController')
const userController = require('../controllers/userController')
const authenticationMiddleware = require('../middlewares/authenticationMiddleware')
const errorHandler = require('../middlewares/errorHandler')

router.post('/login', userController.login)
router.post('/register', userController.register)

router.get('/', pharmacyController.getAllItem)

router.post('/', pharmacyController.createItem)
router.get('/orders', orderController.getPharmacyOrderStatus)
router.post('/order/:id', orderController.createOrder)
router.post('/pay/:id', paymentController.pay)
router.get('/:id', pharmacyController.detailItem)
router.put('/:id', pharmacyController.updateItem)
router.delete('/:id', pharmacyController.deleteItem)


router.use(errorHandler)

module.exports = router