import React from 'react';
import banner from 'assets/banner.png';
const Banner = () => {
     return (
          <div className="w-full">
               <img src={banner} alt="" className="h-[360px] w-full object-cover"></img>
          </div>
     );
};

export default Banner;
