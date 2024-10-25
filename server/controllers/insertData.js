const Product = require('../models/product');
const ProductCategory = require('../models/productCategory');
const asyncHandler = require('express-async-handler');
const data = require('../data/e-commerce.json');
const data_brand = require('../data/data-brand.json');
const slugify = require('slugify');

const fn = async (product) => {
     await Product.create({
          title: product?.name,
          slug: slugify(product?.name) + Math.round(Math.random() * 5000) + '',
          description: product?.description,
          brand: product?.brand,
          price: Math.round(parseInt(product?.price?.replace(/[^\d]/g, '')) / 100),
          category: product?.category[1],
          quantity: Math.round(Math.random() * 5000),
          sold: Math.round(Math.random() * 1000),
          images: product?.images,
          color: product.variants?.find((el) => el.label === 'Color')?.variants[0],
          thumb: product?.thumb,
          totalRatings: 0,
     });
};

const insertProductData = asyncHandler(async (req, res) => {
     const promises = [];
     for (let product of data) promises.push(fn(product));
     await Promise.all(promises);
     return res.json({
          status: 'Done',
     });
});
const fn2 = async (cate) => {
     await ProductCategory.create({
          title: cate?.cate,
          brand: cate?.brand,
          image: cate?.image,
     });
};
const insertCategory = asyncHandler(async (req, res) => {
     const promises = [];
     for (let product of data_brand) promises.push(fn2(product));
     await Promise.all(promises);
     return res.json('Done');
});
module.exports = {
     insertProductData,
     insertCategory,
};
