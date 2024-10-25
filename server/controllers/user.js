const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const sendMail = require('../ultils/sendMail');
const crypto = require('crypto');
const makeToken = require('uniqid');
// const register = asyncHandler(async (req, res) => {
//      const { email, password, firstname, lastname } = req.body;
//      if (!email || !password || !lastname || !firstname)
//           return res.status(400).json({
//                success: false,
//                mes: 'Missing inputs',
//           });

//      const user = await User.findOne({ email });
//      if (user) throw new Error('User has existed');
//      else {
//           const newUser = await User.create(req.body);
//           return res.status(200).json({
//                success: newUser ? true : false,
//                mes: newUser ? 'Register is successfully. Please go login' : 'Something went wrong',
//           });
//      }
// });

const register = asyncHandler(async (req, res) => {
     const { email, password, firstname, lastname, mobile } = req.body;
     if (!email || !password || !lastname || !firstname || !mobile)
          return res.status(400).json({
               success: false,
               mes: 'Missing inputs',
          });
     // check for existing users with same
     const user = await User.findOne({ email });
     if (user) throw new Error('User has existed');
     else {
          const token = makeToken();
          res.cookie('dataregister', { ...req.body, token }, { httpOnly: true, maxAge: 15 * 60 * 1000 });
          const html = `xin vui lòng click vào link duúi day dé hoàn tãt quá trinh dang ky.Link nay sè hét han sau 15 phút ké tùr bây giờ.
         <a href=${process.env.URL_SERVER}/api/user/final-register/${token}>Click here</a>`;
          await sendMail({ email, html, subject: 'Hoàn tät đăng ký Digital World' });
          return res.json({
               success: true,
               mes: 'Please check your email to active account',
          });
     }
});
const finalRegister = async (req, res) => {
     try {
          const cookie = req.cookies;
          const { token } = req.params;
          if (!cookie || cookie.dataregister.token !== token) {
               res.clearCookie('dataregister');
               return res.redirect(`${process.env.CLIENT_URL}/final-register/fail`);
          }
          const newUser = await User.create({
               email: cookie.dataregister.email,
               password: cookie.dataregister.password,
               mobile: cookie.dataregister.mobile,
               firstname: cookie.dataregister.firstname,
               lastname: cookie.dataregister.lastname,
          });

          if (newUser) {
               res.clearCookie('dataregister');
               return res.redirect(`${process.env.CLIENT_URL}/final-register/success`);
          } else {
               res.clearCookie('dataregister');
               return res.redirect(`${process.env.CLIENT_URL}/final-register/fail`);
          }
     } catch (error) {
          // Xử lý lỗi ở đây nếu cần
          console.error(error);
          return res.redirect(`${process.env.CLIENT_URL}/final-register/error`);
     }
};

// Refresh token => Cấp mới access token
// Access token => Xác thực người dùng, quân quyên người dùng
const login = asyncHandler(async (req, res) => {
     const { email, password } = req.body;
     if (!email || !password)
          return res.status(400).json({
               success: false,
               mes: 'Missing inputs',
          });
     // plain object
     const response = await User.findOne({ email });
     if (response && (await response.isCorrectPassword(password))) {
          // Tách password và role ra khỏi response
          const { password, role, refreshToken, ...userData } = response.toObject();
          // Tạo access token
          const accessToken = generateAccessToken(response._id, role);
          // Tạo refresh token
          const newRefreshToken = generateRefreshToken(response._id);
          // Lưu refresh token vào database
          await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
          // Lưu refresh token vào cookie
          res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
          return res.status(200).json({
               success: true,
               accessToken,
               userData,
          });
     } else {
          throw new Error('Invalid credentials!');
     }
});
const getCurrent = asyncHandler(async (req, res) => {
     const { _id } = req.user;
     const user = await User.findById(_id).select('-refreshToken -password');
     return res.status(200).json({
          success: user ? true : false,
          rs: user ? user : 'User not found',
     });
});
const refreshAccessToken = asyncHandler(async (req, res) => {
     // Lấy token từ cookies
     const cookie = req.cookies;
     // Check xem có token hay không
     if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies');
     // Check token có hợp lệ hay không
     const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
     const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken });
     return res.status(200).json({
          success: response ? true : false,
          newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched',
     });
});

const logout = asyncHandler(async (req, res) => {
     const cookie = req.cookies;
     if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies');
     // Xóa refresh token ở db
     await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true });
     // Xóa refresh token ở cookie trình duyệt
     res.clearCookie('refreshToken', {
          httpOnly: true,
          secure: true,
     });
     return res.status(200).json({
          success: true,
          mes: 'Logout is done',
     });
});
// Client gửi email
// Server check email có hợp lệ hay không => Gửi mail + kèm theo link (password change token)
// Client check mail => click link
// Client gửi api kèm token
// Check token có giống với token mà server gửi mail hay không
// Change password

const forgotPassword = asyncHandler(async (req, res) => {
     const { email } = req.body;
     if (!email) throw new Error('Missing email');
     const user = await User.findOne({ email });
     if (!user) throw new Error('User not found');
     const resetToken = user.createPasswordChangedToken();
     await user.save();

     const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`;

     const data = {
          email,
          html,
          subject: `Reset your password`,
     };
     const rs = await sendMail(data);
     return res.status(200).json({
          success: rs.response?.includes('OK') ? true : false,
          mes: rs.response?.includes('OK') ? 'Hãy check mail của ban.' : 'Đã Có lỗi, hãy thử lai sau',
     });
});
const resetPassword = asyncHandler(async (req, res) => {
     const { password, token } = req.body;
     if (!password || !token) throw new Error('Missing inputs');
     const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
     const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
     if (!user) throw new Error('Invalid reset token');
     user.password = password;
     user.passwordResetToken = undefined;
     user.passwordChangedAt = Date.now();
     user.passwordResetExpires = undefined;
     await user.save();
     return res.status(200).json({
          success: user ? true : false,
          mes: user ? 'Updated password' : 'Something went wrong',
     });
});
const getUsers = asyncHandler(async (req, res) => {
     const queries = { ...req.query };
     const excludeFields = ['limit', 'sort', 'page', 'fields'];
     excludeFields.forEach((el) => delete queries[el]);
     let queryString = JSON.stringify(queries);
     queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (macthedEl) => `$${macthedEl}`);
     const formattedQueries = JSON.parse(queryString);
     if (queries?.name) formattedQueries.name = { $regex: queries.name, $options: 'i' };
     if (req.query.q) {
          delete formattedQueries.q;
          formattedQueries['$or'] = [
               { firstname: { $regex: req.query.q, $options: 'i' } },
               { lastname: { $regex: req.query.q, $options: 'i' } },
               { email: { $regex: req.query.q, $options: 'i' } },
          ];
     }
     console.log(formattedQueries);
     queryCommand = User.find(formattedQueries);
     if (req.query.fields) {
          const fields = req.query.fields.split(',').join(' ');
          queryCommand = queryCommand.select(fields);
     }
     if (req.query.sort) {
          const sortBy = req.query.sort.split(',').join(' ');
          queryCommand = queryCommand.sort(sortBy);
     }

     const page = +req.query.page || 1;
     const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
     const skip = (page - 1) * limit;
     queryCommand.skip(skip).limit(limit);
     queryCommand.exec(async (err, response) => {
          if (err) throw new Error(err.message);
          const counts = await User.find(formattedQueries).countDocuments();
          return res.status(200).json({
               success: response ? true : false,
               counts,
               users: response ? response : 'Cannot get users',
          });
     });
});
const deleteUser = asyncHandler(async (req, res) => {
     const { uid } = req.params;
     if (!uid) throw new Error('Missing inputs');
     const response = await User.findByIdAndDelete(uid);
     return res.status(200).json({
          success: response ? true : false,
          mes: response ? `User with email ${response.email} deleted` : 'No user delete',
     });
});
const updateUser = asyncHandler(async (req, res) => {
     //
     const { _id } = req.user;
     if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs');
     const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select(
          '-password -role -refreshToken',
     );
     return res.status(200).json({
          success: response ? true : false,
          updatedUser: response ? response : 'Some thing went wrong',
     });
});
const updateUserByAdmin = asyncHandler(async (req, res) => {
     //
     const { uid } = req.params;
     if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
     const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select(
          '-password -role -refreshToken',
     );
     return res.status(200).json({
          success: response ? true : false,
          mes: response ? 'Updated success' : 'Some thing went wrong',
     });
});
const updateAddress = asyncHandler(async (req, res) => {
     //
     const { _id } = req.user;
     if (!req.body.address) throw new Error('Missing inputs');
     const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true }).select(
          '-password -role -refreshToken',
     );
     return res.status(200).json({
          success: response ? true : false,
          updatedAddress: response ? response : 'Some thing went wrong',
     });
});
const updateCart = asyncHandler(async (req, res) => {
     //
     const { _id } = req.user;
     const { pid, quantity, color } = req.body;
     if (!pid || !quantity || !color) throw new Error('Missing inputs');
     const user = await User.findById(_id).select('cart');
     const alreadyProduct = user?.cart.find((el) => el.product.toString() === pid);
     if (alreadyProduct) {
          if (alreadyProduct.color === color) {
               const response = await User.updateOne(
                    { cart: { $elemMatch: alreadyProduct } },
                    { $set: { 'cart.$.quantity': quantity } },
                    { new: true },
               ).select('cart');
               return res.status(200).json({
                    success: response ? true : false,
                    updatedUser: response ? response : 'some thing went wrong',
               });
          } else {
               const response = await User.findByIdAndUpdate(
                    _id,
                    { $push: { cart: { product: pid, quantity, color } } },
                    { new: true },
               ).select('cart');
               return res.status(200).json({
                    success: response ? true : false,
                    updatedUser: response ? response : 'some thing went wrong',
               });
          }
     } else {
          const response = await User.findByIdAndUpdate(
               _id,
               { $push: { cart: { product: pid, quantity, color } } },
               { new: true },
          ).select('cart');
          return res.status(200).json({
               success: response ? true : false,
               updatedUser: response ? response : 'some thing went wrong',
          });
     }
});
module.exports = {
     register,
     login,
     getCurrent,
     refreshAccessToken,
     logout,
     forgotPassword,
     resetPassword,
     getUsers,
     deleteUser,
     updateUser,
     updateUserByAdmin,
     updateAddress,
     updateCart,
     finalRegister,
};
