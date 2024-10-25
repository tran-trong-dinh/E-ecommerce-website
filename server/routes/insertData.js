const router = require('express').Router();
const controller = require('../controllers/insertData');

router.post('/insert-products', controller.insertProductData);
router.post('/insert-categories', controller.insertCategory);
module.exports = router;
