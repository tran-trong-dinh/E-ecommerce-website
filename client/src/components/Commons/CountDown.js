import React, { memo } from 'react';

function CountDown({ unit, number }) {
     return (
          <div className="w-[30%] h-[60px] flex justify-center items-center bg-gray-200 rounded-md flex-col">
               <span>{number}</span>
               <span className="text-semi text-gray-700">{unit}</span>
          </div>
     );
}

export default memo(CountDown);
