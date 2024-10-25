import { useMemo } from 'react';
import { generateRange } from '../utils/helper';
import icons from '../utils/icons';

const { BiDotsHorizontalRounded } = icons;
const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
     const paginationArray = useMemo(() => {
          const pageSize = process.env.REACT_APP_LIMIT_PAGE || 10;
          const paginationCount = Math.ceil(totalProductCount / pageSize);
          const totalPaginationItem = siblingCount + 5;
          if (paginationCount <= totalPaginationItem) return generateRange(1, paginationCount);
          const isShowLeft = currentPage - siblingCount > 2;
          const isShowRight = currentPage + siblingCount < paginationCount - 2;
          if (isShowLeft || !isShowRight) {
               const rightStart = paginationCount - 4;
               const rightRange = generateRange(rightStart, paginationCount);
               return [1, '...', ...rightRange];
          }
          if (!isShowLeft || isShowRight) {
               const leftRange = generateRange(1, 5);
               return [...leftRange, '...', paginationCount];
          }
          if (!isShowLeft || !isShowRight) {
               const leftRange = generateRange(1, 5);
               return [...leftRange, '...', paginationCount];
          }
          const siblingLeft = Math.max(currentPage - siblingCount, 1);
          const singlingRight = Math.min(currentPage + siblingCount, paginationCount);
          if (isShowLeft && isShowRight) {
               const middleRange = generateRange(siblingLeft, singlingRight);
               return [1, '...', ...middleRange, '...', paginationCount];
          }
     }, [totalProductCount, currentPage, siblingCount]);
     return paginationArray;
};

export default usePagination;
