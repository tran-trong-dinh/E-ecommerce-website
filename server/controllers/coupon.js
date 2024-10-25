const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');
const createNewCoupon = asyncHandler(async (req, res) => {
     const { name, discount, expiry } = req.body;
     if ((!name, !discount, !expiry)) throw new Error('Missing inputs');
     const response = await Coupon.create({
          ...req.body,
          expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
     });
     return res.json({
          success: response ? true : false,
          newCoupon: response ? response : 'Cannot create new coupon',
     });
});
const getCoupons = asyncHandler(async (req, res) => {
     const response = await Coupon.find().select('-createdAt -updatedAt');
     return res.json({
          success: response ? true : false,
          Coupons: response ? response : 'Cannot get coupon',
     });
});
const updateCoupon = asyncHandler(async (req, res) => {
     const { cid } = req.params;
     if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
     let couponInput = { ...req.body };
     if (couponInput?.expiry) couponInput.expiry = Date.now() + +couponInput.expiry * 24 * 60 * 60 * 1000;
     const response = await Coupon.findByIdAndUpdate(cid, couponInput, { new: true });
     return res.json({
          success: response ? true : false,
          updatedCoupon: response ? response : 'Cannot update coupon',
     });
});
const deleteCoupon = asyncHandler(async (req, res) => {
     const { cid } = req.params;
     const response = await Coupon.findByIdAndDelete(cid);
     return res.json({
          success: response ? true : false,
          deletedCoupon: response ? 'Delete coupon successfully' : 'Cannot delete coupon',
     });
});
module.exports = {
     createNewCoupon,
     getCoupons,
     updateCoupon,
     deleteCoupon,
};
