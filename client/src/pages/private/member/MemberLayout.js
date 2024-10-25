import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import path from 'utils/path';

const MemberLayout = () => {
     const { isLoggedIn, currentUser } = useSelector((state) => state.user);
     if (!isLoggedIn || !currentUser) {
          return <Navigate to={`/${path.LOGIN}`} replace={true} />;
     }
     return (
          <div>
               MemberLayout
               <Outlet />
          </div>
     );
};

export default MemberLayout;
