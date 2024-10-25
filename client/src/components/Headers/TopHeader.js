import React, { memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import path from 'utils/path';
// import { getCurrentUser } from 'store/user/asyncActions';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearMessage, logout } from 'store/user/userSlice';
// import icons from 'utils/icons';
// import Swal from 'sweetalert2';
// const { AiOutlineLogout } = icons;
function TopHeader() {
    // const dispatch = useDispatch();
    // const { isLoggedIn, currentUser, message } = useSelector((state) => state.user);
    // const navigate = useNavigate();
    // useEffect(() => {
    //      if (isLoggedIn === true) {
    //           dispatch(getCurrentUser());
    //      }
    // }, [dispatch, isLoggedIn]);
    // useEffect(() => {
    //      if (message) {
    //           Swal.fire('Opps', message, 'info').then(() => {
    //                dispatch(clearMessage());

    //                navigate(`/${path.LOGIN}`);
    //           });
    //      }
    // }, [message]);
    return (
        <div className="h-[38px] w-full bg-main flex justify-center items-center">
            <div className="w-main flex justify-between items-centers text-sm text-white">
                <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                {/* {isLoggedIn ? (
                         <span className="flex items-center gap-2 text-sm">
                              <span>{`Welcome, ${currentUser?.lastname} ${currentUser?.firstname}`}</span>
                              <span
                                   className="hover:rounded-full
                                          hover:text-main p-2 hover:bg-gray-200 cursor-pointer"
                                   onClick={() => {
                                        dispatch(logout());
                                   }}
                              >
                                   <AiOutlineLogout size={18} />
                              </span>
                         </span>
                    ) : ( */}
                <Link className="hover:text-gray-500 hover:cursor-pointer" to={`/login`}>
                    Sign In or Create Account
                </Link>
                {/* )} */}
            </div>
        </div>
    );
}

export default memo(TopHeader);
