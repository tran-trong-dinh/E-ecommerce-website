const router = require('express').Router();
const controller = require('../controllers/user');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/current', verifyAccessToken, controller.getCurrent);
router.get('/final-register/:token', controller.finalRegister);
router.post('/refresh-token', controller.refreshAccessToken);
router.get('/logout', controller.logout);
router.post('/forgot-password', controller.forgotPassword);
router.put('/reset-password', controller.resetPassword);
router.get('/', [verifyAccessToken, isAdmin], controller.getUsers);
router.delete('/:uid', [verifyAccessToken, isAdmin], controller.deleteUser);
router.put('/current', [verifyAccessToken], controller.updateUser);
router.put('/address', [verifyAccessToken], controller.updateAddress);
router.put('/cart', [verifyAccessToken], controller.updateCart);
router.put('/:uid', [verifyAccessToken, isAdmin], controller.updateUserByAdmin);

module.exports = router;
