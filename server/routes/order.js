const router = require('express').Router();
const controller = require('../controllers/order');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], controller.createOrder);
router.get('/', verifyAccessToken, controller.getUserOrder);
router.get('/admin', [verifyAccessToken, isAdmin], controller.getOrders);
router.put('/status/:oid', [verifyAccessToken, isAdmin], controller.updateStatus);
// router.delete('/:bid', [verifyAccessToken, isAdmin], controller.deleteBlog);
module.exports = router;
