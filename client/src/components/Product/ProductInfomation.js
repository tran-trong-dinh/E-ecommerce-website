import React, { memo, useCallback, useEffect, useState } from 'react';
import { productInfoTabs } from 'utils/constant';
import { renderStartFromNumber } from 'utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { VoteModel, Button, VoteBar, Comment } from 'components';
import { apiRatings } from 'apis';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import path from 'utils/path';
import { showModal } from 'store/app/appSlice';

const ProductInfomation = ({ totalRatings, ratings, nameProduct, pid, rerenderDetail }) => {
     const [activatedTab, setActivatedTab] = useState(1);
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const { isLoggedIn } = useSelector((state) => state.user);
     const [payload, setPayload] = useState({
          comment: '',
          rating: 0,
     });
     const handleSubmitVote = useCallback(async ({ comment, score }) => {
          if (!comment || !score || !pid) {
               toast.error('Please enter a valid');
               return;
          }
          const response = await apiRatings({ star: score, comment, pid });
          if (response.success) {
               dispatch(showModal({ isShowModal: false, modalChildren: null }));
               rerenderDetail(true);
          }
     });

     return (
          <div className="flex flex-col gap-2">
               <div>
                    {productInfoTabs.map((item) => (
                         <span
                              className={`py-2 px-4 cursor-pointer ${
                                   activatedTab === item.id ? 'bg-white border border-b-0' : 'bg-gray-200 '
                              }`}
                              key={item.id}
                              onClick={() => setActivatedTab(item.id)}
                         >
                              {item.name}
                         </span>
                    ))}
               </div>
               <div className="w-full border p-4">
                    {productInfoTabs.some((item) => item.id === activatedTab && activatedTab == 5) ? (
                         <div>
                              <div className="flex p-4">
                                   <div className="flex-4 flex flex-col border border-red-500 items-center justify-center">
                                        {<span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>}
                                        <span className="flex items-center gap-1">
                                             {renderStartFromNumber(totalRatings)?.map((el, index) => (
                                                  <span key={index}>{el}</span>
                                             ))}
                                        </span>
                                        <span className="text-sm">{`${ratings?.length} reviewer`}</span>
                                   </div>
                                   <div className="flex-4 border p-4 flex flex-col-reverse justify-center gap-2">
                                        {Array.from(Array(5).keys()).map((item) => (
                                             <VoteBar
                                                  key={item}
                                                  number={item + 1}
                                                  ratingTotal={ratings?.length}
                                                  ratingCount={ratings?.filter((el) => el.star === item + 1).length}
                                             />
                                        ))}
                                   </div>
                              </div>
                              <div className="p-4 flex flex-col items-center gap-5">
                                   <span>Do you review this product</span>
                                   <Button
                                        handleOnClick={() => {
                                             if (!isLoggedIn) {
                                                  Swal.fire({
                                                       text: 'Login to vote',
                                                       icon: 'warning',
                                                       showCancelButton: true,
                                                       confirmButtonColor: '#3085d6',
                                                       cancelButtonColor: '#d33',
                                                       confirmButtonText: 'Login',
                                                  }).then((rs) => {
                                                       if (rs.isConfirmed) {
                                                            navigate(`/${path.LOGIN}`);
                                                       }
                                                  });
                                             } else {
                                                  dispatch(
                                                       showModal({
                                                            isShowModal: true,
                                                            modalChildren: (
                                                                 <VoteModel
                                                                      nameProduct={nameProduct}
                                                                      handleSubmitVote={handleSubmitVote}
                                                                 />
                                                            ),
                                                       }),
                                                  );
                                             }
                                        }}
                                   >
                                        Vote now!
                                   </Button>
                              </div>
                              <div className="flex flex-col gap-3">
                                   {ratings?.map((el) => (
                                        <Comment
                                             key={el._id}
                                             star={el.star}
                                             updatedAt={el.updatedAt}
                                             comment={el.comment}
                                             name={`${el.postedBy.lastname} ${el.postedBy.firstname}`}
                                        />
                                   ))}
                              </div>
                         </div>
                    ) : (
                         productInfoTabs.some((item) => item.id === activatedTab) &&
                         productInfoTabs[activatedTab - 1].content
                    )}
               </div>
          </div>
     );
};

export default memo(ProductInfomation);
