import React, { memo } from 'react';

const InputSort = ({ value, changeValue, options }) => {
     return (
          <select className="from-select text-sm" value={value} onChange={(e) => changeValue(e.target.value)}>
               {options.map((el) => (
                    <option key={el.id} value={el.value}>
                         {el.text}
                    </option>
               ))}
          </select>
     );
};

export default memo(InputSort);
