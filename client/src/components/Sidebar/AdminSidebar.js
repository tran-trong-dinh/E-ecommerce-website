import React, { Fragment, useState } from 'react';
import logo from 'assets/logo.png';
import { adminSidebar } from 'utils/constant';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import icons from 'utils/icons';

const activatedStyle = 'px-4 py-2 flex items-center gap-4 text-gray-200 text-sm  bg-gray-700';
const notActivatedStyle = 'px-4 py-2 flex items-center gap-4 text-gray-200 text-sm  hover:bg-gray-600';
const { AiOutlineCaretDown, AiOutlineCaretRight } = icons;
const AdminSidebar = () => {
     const [activated, setActivated] = useState([]);
     const handleShowTab = (tabId) => {
          if (activated.some((el) => el === tabId)) setActivated((prev) => prev.filter((el) => el !== tabId));
          else setActivated([...activated, tabId]);
     };
     return (
          <div className="bg-slate-500 h-full py-4">
               <div className="flex flex-col justify-center items-center p-4 gap-2">
                    <img src={logo} alt="Logo" className="w-[200px] object-contain" />
                    <small>Admin workspace</small>
               </div>
               <div>
                    {adminSidebar.map((el) => (
                         <Fragment key={el.id}>
                              {el.type === 'SINGLE' && (
                                   <NavLink
                                        to={el.path}
                                        className={({ isActive }) =>
                                             clsx(isActive && activatedStyle, !isActive && notActivatedStyle)
                                        }
                                   >
                                        <span>{el.icon}</span>
                                        <span>{el.text}</span>
                                   </NavLink>
                              )}
                              {el.type === 'PARENT' && (
                                   <div
                                        onClick={() => {
                                             handleShowTab(el.id);
                                        }}
                                        className=" flex flex-col text-gray-200 text-sm"
                                   >
                                        <div className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-gray-600">
                                             <div className="flex items-center gap-2 cursor-pointer">
                                                  <span>{el.icon}</span>
                                                  <span>{el.text}</span>
                                             </div>
                                             {activated.some((id) => id === el.id) ? (
                                                  <AiOutlineCaretDown />
                                             ) : (
                                                  <AiOutlineCaretRight />
                                             )}
                                        </div>
                                        {activated.some((id) => id === el.id) && (
                                             <div className="flex flex-col">
                                                  {el.subMenu.map((item, idex) => (
                                                       <NavLink
                                                            key={idex}
                                                            to={item.path}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className={({ isActive }) =>
                                                                 clsx(
                                                                      isActive && activatedStyle,
                                                                      !isActive && notActivatedStyle,
                                                                      'pl-10',
                                                                 )
                                                            }
                                                       >
                                                            {item.text}
                                                       </NavLink>
                                                  ))}
                                             </div>
                                        )}
                                   </div>
                              )}
                         </Fragment>
                    ))}
               </div>
          </div>
     );
};

export default AdminSidebar;
