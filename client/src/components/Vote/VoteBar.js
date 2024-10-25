import React, { useEffect, useRef } from 'react';
import icons from 'utils/icons';
const { AiFillStar } = icons;
const VoteBar = ({ number, ratingCount, ratingTotal }) => {
     const percentRef = useRef();
     const percentCount = Math.round((ratingCount * 100) / ratingTotal) || 0;
     useEffect(() => {
          percentRef.current.style.cssText = `left: ${100 - percentCount}%`;
     }, [ratingCount, ratingTotal]);
     return (
          <div className="flex items-center gap-2 text=sm gray-500">
               <div className="w-[10%] flex items-center justify-center text-sm gap1">
                    <span>{number}</span>
                    <AiFillStar color="orange" />
               </div>
               <div className="w-[75%]">
                    <div className="w-full h-[6px] relative bg-gray-200 rounded-l-full rounded-r-full">
                         <div
                              ref={percentRef}
                              className="absolute inset-0 bg-red-500 h-[6px] right-8 rounded-l-full rounded-t-full"
                         ></div>
                    </div>
               </div>
               <div className="w-[15%] flex justify-end text-xs text-400">{`${ratingCount || 0} reviews`}</div>
          </div>
     );
};

export default VoteBar;
