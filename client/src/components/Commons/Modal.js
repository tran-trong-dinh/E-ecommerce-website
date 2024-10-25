import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from 'store/app/appSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ children }) => {
     const dispatch = useDispatch();
     const isShowModal = useSelector((state) => state.app.isShowModal);
     const closeModal = () => {
          dispatch(showModal({ isShowModal: false, modalChildren: null }));
     };

     return (
          <AnimatePresence>
               {isShowModal && (
                    <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         onClick={closeModal}
                         className="absolute inset-0 z-50 bg-overlay flex items-center justify-center"
                    >
                         {children}
                    </motion.div>
               )}
          </AnimatePresence>
     );
};

export default memo(Modal);
