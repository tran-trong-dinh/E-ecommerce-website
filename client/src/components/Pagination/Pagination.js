import React from 'react';
import usePagination from 'hooks/usePagination';
import PagiItem from './PagiItem';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ totalCount, titlePage }) => {
     const [params] = useSearchParams();
     const pagination = usePagination(totalCount, params.get('page') || 1);
     const range = (page) => {
          const currentPage = +params.get('page');
          const pageSize = +process.env.REACT_APP_LIMIT_PAGE || 10;
          const start = (currentPage - 1) * pageSize;
          const end = Math.min(currentPage * pageSize, totalCount);
          return `${start} - ${end}`;
     };
     return (
          <div className="flex w-full justify-between items-center">
               {!+params.get('page') && (
                    <span className="text-sm italic">{`Show ${titlePage} 1 - ${Math.min(
                         process.env.REACT_APP_LIMIT_PAGE || 10,
                         totalCount,
                    )} of ${totalCount}`}</span>
               )}
               {params.get('page') && (
                    <span className="text-sm italic">{`Show ${titlePage} ${range()} of ${totalCount}`}</span>
               )}
               <div className="flex items-center">
                    {pagination.map((p, index) => (
                         <PagiItem key={index}>{p}</PagiItem>
                    ))}
               </div>
          </div>
     );
};

export default Pagination;
