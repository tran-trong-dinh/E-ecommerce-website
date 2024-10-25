const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');
const createNewBlog = asyncHandler(async (req, res) => {
     const { title, description, category } = req.body;
     if (!title || !description || !category) throw new Error('Missing inputs');
     const response = await Blog.create(req.body);
     return res.json({
          success: response ? true : false,
          createdBlog: response ? response : 'Cannot create new blog',
     });
});
const getBlogs = asyncHandler(async (req, res) => {
     const response = await Blog.find();
     return res.json({
          success: response ? true : false,
          Blogs: response ? response : 'Cannot get blog',
     });
});
const updateBlog = asyncHandler(async (req, res) => {
     const { bid } = req.params;
     const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
     if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
     return res.json({
          success: response ? true : false,
          updatedBlog: response ? response : 'Cannot update blog',
     });
});

// LIKE
// DISLIKE
/*Khi người dùng like một bài blog thi:
1. Check xem người đó trước đó có dislike hay không => bỏ dislike
2. Check xem người đó trước đó có like hay không và bỏ like / thêm like*/
const likeBlog = asyncHandler(async (req, res) => {
     const { _id } = req.user;
     const { bid } = req.params;
     if (!bid) throw new Error('Missing inputs');
     const blog = await Blog.findById(bid);
     const alreadyDisliked = blog?.dislikes?.find((el) => el.toString() === _id);
     if (alreadyDisliked) {
          const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
          //   return res.json({
          //        success: response ? true : false,
          //        rs: response,
          //   });
     }
     const isLiked = blog?.likes.find((el) => el.toString() === _id);
     if (isLiked) {
          const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
          return res.json({ success: response ? true : false, rs: response });
     } else {
          const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true });
          return res.json({ success: response ? true : false, rs: response });
     }
});
const dislikeBlog = asyncHandler(async (req, res) => {
     const { _id } = req.user;
     const { bid } = req.params;
     if (!bid) throw new Error('Missing inputs');
     const blog = await Blog.findById(bid);
     const alreadyLiked = blog?.likes?.find((el) => el.toString() === _id);
     if (alreadyLiked) {
          const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
          //   return res.json({
          //        success: response ? true : false,
          //        rs: response,
          //   });
     }
     const isDisliked = blog?.dislikes.find((el) => el.toString() === _id);
     if (isDisliked) {
          const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
          return res.json({ success: response ? true : false, rs: response });
     } else {
          const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true });
          return res.json({ success: response ? true : false, rs: response });
     }
});
const getBlog = asyncHandler(async (req, res) => {
     const excludedFields = '-refreshToken -password -role -createdAt -updatedAt';
     const { bid } = req.params;
     const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberView: 1 } }, { new: true })
          .populate('likes', excludedFields)
          .populate('dislikes', excludedFields);
     return res.json({
          success: blog ? true : false,
          rs: blog,
     });
});
const deleteBlog = asyncHandler(async (req, res) => {
     const { bid } = req.params;
     const response = await Blog.findByIdAndDelete(bid);
     return res.json({
          success: response ? true : false,
          response: response ? 'Delete blog success' : 'Cannot delete blog',
     });
});
const uploadImagesBlog = asyncHandler(async (req, res) => {
     if (!req.file) throw new Error('Missing inputs');
     const { bid } = req.params;
     const response = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true });
     return res.status(200).json({
          success: response ? true : false,
          updateBlog: response ? response : 'Cannot upload images blog',
     });
});
module.exports = {
     createNewBlog,
     getBlogs,
     updateBlog,
     likeBlog,
     dislikeBlog,
     getBlog,
     deleteBlog,
     uploadImagesBlog,
};
