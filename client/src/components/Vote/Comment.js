import React from 'react';
import defaultAvatar from 'assets/default-avatar.png';
import moment from 'moment';
import 'moment/locale/vi';
import { renderStartFromNumber } from 'utils/helper';
const Comment = ({ image = defaultAvatar, name = 'Anonymous', comment, updatedAt, star }) => {
     moment.locale('vi');
     return (
          <div className="flex gap-2">
               <div className="p-4 flex-none">
                    <img src={image} alt="avatar" className="w-[30px] h-[30px] object-contain rounded-full" />
               </div>
               <div className="flex flex-col flex-auto text-xs">
                    <div className="flex justify-between items-center">
                         <h3 className="font-semibold">{name}</h3>
                         <span className="text-xs italic">{moment(updatedAt).fromNow()}</span>
                    </div>
                    <div className="flex flex-col gap-2 pl-4 text-sm mt-4 border py-2 bg-gray-100 border-gray-300">
                         <span className="flex items-center gap-1">
                              <span className="font-semibold">Vote:</span>
                              <span className="flex items-center gap-1">
                                   {renderStartFromNumber(star)?.map((el, index) => (
                                        <span key={index}>{el}</span>
                                   ))}
                              </span>
                         </span>
                         <span className="flex gap-1">
                              <span className="font-semibold">Comment: </span>
                              <span className="font-xs">{comment}</span>
                         </span>
                    </div>
               </div>
          </div>
     );
};

export default Comment;
