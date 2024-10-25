import React, { memo } from 'react';
import icons from 'utils/icons';
const { MdEmail } = icons;
function Footer() {
     return (
          <div className="w-full mt-[10px]">
               <div className="h-[103px] bg-main flex items-center justify-center">
                    <div className="w-main flex items-center justify-between">
                         <div className="flex flex-col flex-1">
                              <span className="text-[20px] text-gray-100">SIGN UP TO NEWSLETTER</span>
                              <small className="text-[13px]text-gray-300">
                                   Subscribe now and receive weekly newsletter
                              </small>
                         </div>
                         <div className="flex-1 flex items-center">
                              <input
                                   className="w-full p-4 rounded-l-full text-white bg-[#F04646] outline-none placeholder:text-sm placeholder:text-gray-200 placeholder:italic placeholder:opacity-50"
                                   placeholder="Email address"
                              />
                              <div className="h-[56px] w[56px] bg-[#F04646] rounded-r-full flex items-center justify-center text-white pr-6">
                                   <MdEmail size={18} />
                              </div>
                         </div>
                    </div>
               </div>
               <div className="h-[407px] w-full bg-gray-900 flex items-center justify-center text-white text-[13px]">
                    <div className="w-main flex items-start">
                         <div className="flex-2 flex flex-col gap-2">
                              <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
                                   ABOUT US
                              </h3>
                              <span>
                                   <span>Address: </span>
                                   <span className="opacity-70">474 Ontario St Toronto, ON M4X 1M7 Canada</span>
                              </span>
                              <span>
                                   <span>Phone: </span>
                                   <span className="opacity-70">(41234) 56789xxx</span>
                              </span>
                              <span>
                                   <span>Mail: </span>
                                   <span className="opacity-70">tadathemes@gmail.com</span>
                              </span>
                         </div>
                         <div className="flex-1 flex flex-col gap-2">
                              <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
                                   INFORMATION
                              </h3>
                              <span> Typography</span>
                              <span>Gallery</span>
                              <span>Store Location</span>
                              <span>Today's Deals</span>
                              <span>Contacts</span>
                         </div>
                         <div className="flex-1 flex flex-col gap-2">
                              <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
                                   WHO WE ARE
                              </h3>
                              <span>Help</span>
                              <span>Free Shipping</span>
                              <span>FAQs</span>
                              <span>Return & Exchange</span>
                              <span>Testimonials</span>
                         </div>
                         <div className="flex-1 flex flex-col gap-2">
                              <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
                                   DIGITAL WORLD STOR
                              </h3>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default memo(Footer);
