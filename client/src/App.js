import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    Login,
    Home,
    Public,
    Services,
    DetailProduct,
    Blogs,
    Faqs,
    Products,
    FinalRegister,
    RestPassword,
} from './pages/public';
import path from './utils/path';
import {} from './store/app/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from './store/app/asyncActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './components';
import { ManageUser, DashBoard, AdminLayout, ManageProduct, ManageOrder } from './pages/private/admin';
import { MemberLayout, Personal } from './pages/private/member';
function App() {
    const dispatch = useDispatch();
    const { isShowModal, modalChildren } = useSelector((state) => state.app);
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    return (
        <div className="font-main relative">
            {isShowModal && <Modal>{modalChildren}</Modal>}
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />}></Route>
                    <Route path={path.FAQ} element={<Faqs />}></Route>
                    <Route path={path.OUR_SERVICES} element={<Services />}></Route>
                    <Route path={path.BLOGS} element={<Blogs />}></Route>
                    <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}></Route>
                    <Route path={path.PRODUCTS} element={<Products />}></Route>
                    <Route path={path.REST_PASSWORD} element={<RestPassword />}></Route>
                    <Route path={path.HOME} element={<Home />}></Route>
                </Route>
                <Route path={path.ADMIN} element={<AdminLayout />}>
                    <Route path={path.DASHBOARD} element={<DashBoard />}></Route>
                    <Route path={path.MANAGE_USER} element={<ManageUser />}></Route>
                    <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />}></Route>
                    <Route path={path.MANAGE_ORDER} element={<ManageOrder />}></Route>
                </Route>
                <Route path={path.MEMBER} element={<MemberLayout />}>
                    <Route path={path.PERSONAL} element={<Personal />}></Route>
                </Route>
                <Route path={path.FINAL_REGISTER} element={<FinalRegister />}></Route>
                <Route path={path.LOGIN} element={<Login />}></Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </div>
    );
}

export default App;
