import React, { memo, useState } from 'react';
import logo from 'assets/logo.png';
import { voteOptions } from 'utils/constant';
import icons from 'utils/icons';
import { Button } from 'components';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from 'store/app/appSlice';
const { AiFillStar } = icons;

const VoteModel = ({ nameProduct, handleSubmitVote }) => {
     const [selectedVote, setSelectedVote] = useState(0);

     const [comment, setComment] = useState('');
     const dispatch = useDispatch();
     const handleStar = (id) => {
          setSelectedVote(id);
     };

     return (
          <div
               onClick={(e) => e.stopPropagation()}
               className="bg-white w-[700px] p-10 flex items-center justify-center gap-4 flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[20px] z-50"
          >
               <img src={logo} alt="Logo" className="w-[300px] object-contain my-8" />
               <h2 className="text-center text-medium text-lg">{`Voting the product ${nameProduct}`}</h2>
               <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    cols={30}
                    rows={3}
                    className="form-textarea w-full"
                    placeholder="Type something"
               ></textarea>
               <div className="w-full flex flex-col gap-4 placeholder:text-xs placeholder:text-gray-500 text-sm">
                    <p>How do you like this product?</p>
                    <div className="flex items-center justify-center gap-4">
                         {voteOptions.map((option) => (
                              <div
                                   key={option.id}
                                   onClick={() => handleStar(option.id)}
                                   className="w-[100px] bg-gray-200 p-4 flex flex-col gap-2 justify-center items-center rounded-[10px] hover:bg-gray-300 cursor-pointer"
                              >
                                   <motion.span
                                        key={selectedVote}
                                        initial={{ rotate: 0 }}
                                        animate={{
                                             rotate: selectedVote === option.id ? 360 : 0,
                                        }}
                                        transition={{ duration: 1 }}
                                   >
                                        <AiFillStar
                                             size={25}
                                             color={
                                                  selectedVote === option.id
                                                       ? 'orange'
                                                       : option.id <= selectedVote
                                                       ? 'orange'
                                                       : 'gray'
                                             }
                                        />
                                   </motion.span>
                                   <span>{option.text}</span>
                              </div>
                         ))}
                    </div>
               </div>
               <Button
                    fw
                    handleOnClick={() => {
                         handleSubmitVote({ comment, score: selectedVote });
                    }}
               >
                    Submit
               </Button>
          </div>
     );
};

export default memo(VoteModel);
