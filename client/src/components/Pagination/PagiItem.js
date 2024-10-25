import React, { memo } from 'react';
import clsx from 'clsx';
import { useSearchParams, useNavigate, createSearchParams, useLocation } from 'react-router-dom';
const PagiItem = ({ children }) => {
     const [params] = useSearchParams();
     const navigate = useNavigate();
     const location = useLocation();
     const handlePagiItem = () => {
          const queries = Object.fromEntries([...params]);
          if (Number(children)) queries.page = children;
          navigate({
               pathname: location.pathname,
               search: createSearchParams(queries).toString(),
          });
     };
     return (
          <button
               className={clsx(
                    'p-4 flex items-center justify-center ',
                    !Number(children) && 'items-end pb-3',
                    Number(children) && 'items-center hover:rounded-full hover:bg-gray-300',
                    +params.get('page') === +children && 'rounded-full bg-gray-300',
                    !+params.get('page') && +children === 1 && 'rounded-full bg-gray-300',
               )}
               type="button"
               onClick={handlePagiItem}
               disabled={!Number(children)}
          >
               {children}
          </button>
     );
};

export default memo(PagiItem);
