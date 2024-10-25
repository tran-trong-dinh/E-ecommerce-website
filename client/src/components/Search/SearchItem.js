import React, { memo, useEffect, useState } from 'react';
import icons from '../../utils/icons';
import { colors } from '../../utils/constant';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { toast } from 'react-toastify';
const { AiOutlineDown } = icons;
const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
     const navigate = useNavigate();
     const [selected, setSelected] = useState([]);
     const [params] = useSearchParams();
     const [price, setPrice] = useState({
          from: '',
          to: '',
     });
     const { category } = useParams();
     const handleSelect = (e) => {
          const already = selected.find((el) => el === e.target.value);
          if (already) setSelected((prev) => prev.filter((el) => el !== e.target.value));
          else setSelected((prev) => [...prev, e.target.value]);
          changeActiveFilter(null);
     };
     const handlePrice = (e, key) => {
          setPrice((prev) => ({ ...prev, [key]: e.target.value }));
     };
     useEffect(() => {
          let param = [];
          for (let i of params.entries()) {
               param.push(i);
          }
          const queries = {};
          for (let i of param) queries[i[0]] = i[1];
          if (selected.length > 0) {
               queries.color = selected.join(',');
               queries.page = 1;
          } else {
               delete queries.color;
          }
          navigate({
               pathname: `/${category}`,
               search: createSearchParams(queries).toString(),
          });
     }, [selected]);
     const debouncePriceFrom = useDebounce(price.from, 500);
     const debouncePriceTo = useDebounce(price.to, 500);
     useEffect(() => {
          let param = [];
          for (let i of params.entries()) {
               param.push(i);
          }
          const queries = {};
          for (let i of param) queries[i[0]] = i[1];
          if (Number(price.from) > 0) queries.from = price.from;
          else delete queries.from;
          if (Number(price.to) > 0) queries.to = price.to;
          else delete queries.to;
          queries.page = 1;
          navigate({
               pathname: `/${category}`,
               search: createSearchParams(queries).toString(),
          });
     }, [debouncePriceFrom, debouncePriceTo]);
     useEffect(() => {
          if (+price.from > +price.to && price.from && price.to) {
               toast.error('Price from must be less than price to', {
                    position: 'top-right',
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
               });
          }
     }, [price]);
     return (
          <div
               className="p-4 text-gray-500 text-xs border border-gray-800 flex justify-center relative gap-6"
               onClick={() => changeActiveFilter(name)}
          >
               <span className="capitalize">{name}</span>
               <AiOutlineDown />
               {activeClick === name && (
                    <div className="absolute z-10 left-0 w-fit border bg-white min-w-[150px] top-[calc(100%+1px)]">
                         {type === 'checkbox' && (
                              <div className="">
                                   <div className="p-4 flex items-center  justify-between border-b">
                                        <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                                        <span
                                             className="underline hover:text-main cursor-pointer"
                                             onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSelected([]);
                                                  changeActiveFilter(null);
                                             }}
                                        >
                                             Reset
                                        </span>
                                   </div>
                                   <div
                                        onClick={(e) => {
                                             e.stopPropagation();
                                        }}
                                        className="flex flex-col gap-3 p-3"
                                   >
                                        {colors.map((el, index) => (
                                             <div key={index} className="flex items-center gap-4">
                                                  <input
                                                       type="checkbox"
                                                       key={index}
                                                       name={el}
                                                       value={el}
                                                       onChange={(e) => handleSelect(e)}
                                                       id={el}
                                                       checked={selected.some((selectedItem) => selectedItem === el)}
                                                       className=""
                                                  />
                                                  <label className="capitalize text-gray-700" htmlFor={el}>
                                                       {el}
                                                  </label>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         )}
                         {type === 'input' && (
                              <div onClick={(e) => e.stopPropagation()}>
                                   <div className="">
                                        <div className="p-4 flex items-center  justify-between border-b">
                                             <span className="whitespace-nowrap">{`The highest price is 31.286.428,58 VND  `}</span>
                                             <span
                                                  className="underline hover:text-main cursor-pointer"
                                                  onClick={(e) => {
                                                       e.stopPropagation();
                                                       setPrice({
                                                            from: '',
                                                            to: '',
                                                       });
                                                  }}
                                             >
                                                  Reset
                                             </span>
                                        </div>
                                        <div className="flex items-center p-2 gap-2">
                                             <div className="flex items-center p-2 gap-2">
                                                  <label htmlFor="from">From</label>
                                                  <input
                                                       value={price.from}
                                                       type="number"
                                                       id="from"
                                                       onChange={(e) => handlePrice(e, 'from')}
                                                       className="form-input"
                                                  />
                                             </div>
                                             <div className="flex items-center p-2 gap-2">
                                                  <label htmlFor="to">From</label>
                                                  <input
                                                       type="number"
                                                       id="to"
                                                       value={price.to}
                                                       onChange={(e) => handlePrice(e, 'to')}
                                                       className="form-input"
                                                  />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         )}
                    </div>
               )}
          </div>
     );
};

export default memo(SearchItem);
