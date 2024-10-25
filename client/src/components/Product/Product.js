import React, { useState } from 'react';
import defaultProduct from 'assets/default-product-image.png';
import labelNew from 'assets/new.png';
import labelTrending from 'assets/trending.png';
import { formatMoney } from 'utils/helper';
import { renderStartFromNumber } from 'utils/helper';
import { SelectOption } from '..';
import icons from 'utils/icons';
import { Link } from 'react-router-dom';
const { AiFillEye, IoMdMenu, BsFillHeartFill } = icons;
const Product = ({ productData, isNew, normal }) => {
     const [isShowOption, setIsShowOption] = useState(false);
     return (
          <div className="w-full text-base px-[10px]">
               <Link
                    to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.slug}`}
                    className="w-full border p-[15px] flex flex-col items-center"
                    onMouseEnter={(e) => {
                         e.stopPropagation();
                         setIsShowOption(true);
                    }}
                    onMouseLeave={(e) => {
                         e.stopPropagation();
                         setIsShowOption(false);
                    }}
               >
                    <div className="w-full relative">
                         {isShowOption && (
                              <div className="absolute left-0 right-0 bottom-0 flex justify-center gap-2 animate-slide-top">
                                   <SelectOption key="eye" icon={<AiFillEye />} />
                                   <SelectOption key="menu" icon={<IoMdMenu />} />
                                   <SelectOption key="heart" icon={<BsFillHeartFill />} />
                              </div>
                         )}
                         <img
                              src={productData?.thumb || defaultProduct}
                              alt={defaultProduct}
                              className="w-[274px] h-[274px] object-cover"
                         />
                         {!normal && (
                              <img
                                   src={isNew ? labelNew : labelTrending}
                                   alt=""
                                   className="absolute w-[100px] h-[35px] top-[0] right-[0] object-cover"
                              />
                         )}
                    </div>
                    <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
                         <span className="flex h-4">
                              {renderStartFromNumber(productData?.totalRatings)?.map((el, index) => {
                                   return <span key={index}>{el}</span>;
                              })}
                         </span>
                         <span className="line-clamp-1">{productData?.title}</span>
                         <span>{`${formatMoney(productData?.price)} VND`}</span>
                    </div>
               </Link>
          </div>
     );
};

export default Product;
