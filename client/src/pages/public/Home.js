import React from 'react';
import { Sidebar, Banner } from '../../components';

import { BestSeller, DealDaily, FeatureProducts, CustomSlider } from '../../components';
import { useSelector } from 'react-redux';
import icons from '../../utils/icons';
const { IoIosArrowForward } = icons;
const Home = () => {
     const { newProducts } = useSelector((state) => state.products);
     const { categories } = useSelector((state) => state.app);
     return (
          <>
               <div className="w-main flex">
                    <div className="flex flex-col gap-5 w-[25%] flex-auto">
                         <Sidebar />
                         <DealDaily></DealDaily>
                    </div>
                    <div className="flex flex-col gap-5 pl-5 w-[75%]">
                         <Banner />
                         <BestSeller />
                    </div>
               </div>
               <div>
                    <FeatureProducts />
               </div>
               <div className="mt-8 w-full">
                    <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">NEW ARRIVALS</h3>
                    <div className="mt-4 mx-[-10px]">
                         <CustomSlider products={newProducts} />
                    </div>
               </div>
               <div className="mt-8 w-full">
                    <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">HOT COLLECTIONS</h3>
                    <div className="mt-4 mx-[-10px] gap-4 flex flex-wrap min-h-[202px]">
                         {categories?.map((el) => (
                              <div key={el._id} className="w-[396px]">
                                   <div className="border flex p-4 gap-4">
                                        <img src={el?.image} className="w-[144px] h-[129px] object-cover" />
                                        <div className="text-gray-700">
                                             <h2 className="font-semibold uppercase">{el?.title}</h2>
                                             <ul className="text-sm">
                                                  {el?.brand?.map((item, index) => (
                                                       <li key={index}>
                                                            <span className="flex items-center gap-1 text-gray-500">
                                                                 <IoIosArrowForward />
                                                                 {item}
                                                            </span>
                                                       </li>
                                                  ))}
                                             </ul>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
               <div className="mt-8 w-full">
                    <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">BLOG POST</h3>
               </div>
          </>
     );
};

export default Home;
