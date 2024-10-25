import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts } from "apis/product";
import {
  Breadcrumbs,
  Button,
  CustomSlider,
  ProductExtraInfo,
  ProductInfomation,
  SelectQuantity,
} from "components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { formatMoney, formatPrice, renderStartFromNumber } from "utils/helper";
import { productExtraInformation } from "utils/constant";
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
function DetailProduct() {
  const { pid, title, category } = useParams();
  const [productData, setProductData] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [rerenderDetail, setRerenderDetail] = useState(false);

  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) {
      setProductData(response.productData);
      setCurrentImage(response.productData.thumb);
    }
  };
  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );
  const handleChangeQuantity = useCallback(
    (type) => {
      if (type === "minus" && quantity === 1) return;
      if (type === "minus") setQuantity((prev) => +prev - 1);
      if (type === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );
  const fetchProducts = async (category) => {
    const response = await apiGetProducts({ category });
    if (response.success) {
      setRelatedProduct(response.products);
    }
  };
  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
  }, [pid]);
  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };
  useEffect(() => {
    fetchProductData();
  }, [rerenderDetail]);
  return (
    <div className="w-full relative">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold">{productData?.title}</h3>
          <Breadcrumbs title={productData?.title} category={category} />
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex">
        <div className="flex flex-col gap-4 w-2/5">
          <div className="h-[458px] w-[458px] border">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: currentImage,
                },
                largeImage: {
                  src: currentImage,
                  width: 1200,
                  height: 1200,
                },
              }}
            />
          </div>
          <div className="w-[458px]">
            <Slider
              className="image-slider flex gap-2 justify-between"
              {...settings}
            >
              {productData?.images?.map((el, index) => (
                <div className="px-2" key={index}>
                  <img
                    onClick={(e) => {
                      handleClickImage(e, el);
                    }}
                    src={el}
                    alt="sub-product"
                    className="h-[143px] w-[143px] object-contain border cursor-pointer"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[30px] font-semibold">{`${formatMoney(
              formatPrice(productData?.price)
            )} VNĐ`}</h2>
            <span className="text-sm text-main mr-7">{`Kho: ${productData?.quantity}`}</span>
          </div>
          <div className="flex items-center mt-4 gap-1">
            {renderStartFromNumber(productData?.totalRatings, 20)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
            <span className="text-sm text-main">{`Đã bán: ${productData?.sold}`}</span>
          </div>
          <ul className="list-disc text-gray-500 text-sm pl-4">
            {productData?.description?.map((el, index) => (
              <li className="leading-6" key={index}>
                {el}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              />
            </div>
            <Button fw>Add to cart</Button>
          </div>
        </div>
        <div className="w-1/5">
          {productExtraInformation?.map((el, index) => (
            <ProductExtraInfo
              key={el.id}
              title={el.title}
              icon={el.icon}
              sub={el.sub}
            ></ProductExtraInfo>
          ))}
        </div>
      </div>
      <div className="w-main m-auto mt-8">
        <ProductInfomation
          totalRatings={productData?.totalRatings}
          ratings={productData?.ratings}
          nameProduct={productData?.title}
          pid={productData?._id}
          rerenderDetail={setRerenderDetail}
        />
      </div>
      <div className="w-main m-auto mt-8">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          OTHER CUSTOMER ALSO LIKED
        </h3>
        <CustomSlider products={relatedProduct} normal={true} />
      </div>
    </div>
  );
}

export default DetailProduct;
