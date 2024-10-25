import React from 'react';
import { renderStartFromNumber, formatMoney } from 'utils/helper';
function ProductCard(props) {
     return (
          <div className="w-1/3 px-[10px] mb-[20px]">
               <div className="flex flex-auto border">
                    <img src={props.image} alt="product" className="w-[120px] object-contain p-4" />
                    <div className="flex flex-col mt-[15px] items-start gap-1 w-full text-sx">
                         <span className="flex h-4">
                              {renderStartFromNumber(props?.totalRatings, 14)?.map((el, index) => {
                                   return <span key={index}>{el}</span>;
                              })}
                         </span>
                         <span className="line-clamp-1 capitalize text-sm">{props?.title?.toLowerCase()}</span>
                         <span>{`${formatMoney(props?.price)} VND`}</span>
                    </div>
               </div>
          </div>
     );
}

export default ProductCard;
