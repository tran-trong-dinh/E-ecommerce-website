import clsx from 'clsx';
import React, { memo } from 'react';

const Select = ({ label, options = [], register, errors, id, validate, style, fw, defaultValue }) => {
     return (
          <div className="flex flex-col h-[80px] gap-2">
               {label && <label htmlFor={id}>{label}</label>}
               <select
                    defaultValue={defaultValue}
                    className={clsx('form-select my-auto', fw && 'w-full', style)}
                    id={id}
                    {...register(id, validate)}
               >
                    <option value="">Chose</option>
                    {options?.map((option) => (
                         <option key={option.value} value={option.value}>
                              {option.label}
                         </option>
                    ))}
               </select>
               {errors[id] && <small className="text-sm text-red-500">{errors[id]?.message}</small>}
          </div>
     );
};

export default memo(Select);
