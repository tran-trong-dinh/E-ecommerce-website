import React, { memo } from 'react';
import { Navigate } from 'utils/constant';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
     return (
          <div className="w-main h-[48px] py-2 border text-sm flex items-center border-y">
               {Navigate.map((el) => (
                    <NavLink
                         to={el.path}
                         key={el.id}
                         className={({ isActive }) =>
                              isActive ? 'pr-12 hover:text-main text-main' : 'pr-12 hover:text-main'
                         }
                    >
                         {el.value}
                    </NavLink>
               ))}
          </div>
     );
};

export default memo(Navigation);
