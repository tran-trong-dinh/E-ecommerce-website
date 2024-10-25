import React from 'react';
import { createSlug } from 'utils/helper';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Sidebar = () => {
    const { categories } = useSelector((state) => state.app);
    console.log(categories);
    return (
        <div className="flex flex-col border">
            {categories?.map((el) => {
                return (
                    <NavLink
                        key={el?.title}
                        to={createSlug(el?.title)}
                        className={({ isActive }) => {
                            return isActive
                                ? 'bg-main text-white hover:text-main text-sm '
                                : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main';
                        }}
                    >
                        {el?.title}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Sidebar;
