import AdminSidebar from 'components/Sidebar/AdminSidebar';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import path from 'utils/path';
const AdminLayout = () => {
     const { isLoggedIn, currentUser } = useSelector((state) => state.user);
     if (!isLoggedIn || !currentUser || currentUser.role !== 'admin') {
          return <Navigate to={`/${path.HOME}`} replace={true} />;
     }
     return (
          <div className="w-full flex bg-gray-100 min-h-screen relative text-gray-900">
               <div className="w-[327px] flex-none fixed top-0 bottom-0">
                    <AdminSidebar />
               </div>
               <div className="w-[327px]"></div>
               <div className="flex-auto">
                    <Outlet />
               </div>
          </div>
     );
};

export default AdminLayout;
