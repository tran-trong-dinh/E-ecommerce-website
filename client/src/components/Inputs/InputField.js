import { clsx } from 'clsx';
import React, { memo } from 'react';
const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields, fw }) => {
     return (
          <div className={clsx('relative flex flex-col mb-2', fw && ' w-full')}>
               {value?.trim() !== '' && (
                    <label
                         className="text-[12px] absolute animate-slide-top-sm top left-[12px] block bg-white px-1"
                         htmlFor={nameKey}
                    >
                         {nameKey?.slice(0, 1)?.toUpperCase() + nameKey?.slice(1)}
                    </label>
               )}
               <input
                    type={type || 'text'}
                    className={clsx(
                         'px-4 py-3 rounded-sm border w-full my-3 placeholder:text-sm placeholder:italic outline-none',
                         type,
                    )}
                    placeholder={nameKey?.slice(0, 1)?.toUpperCase() + nameKey?.slice(1)}
                    value={value}
                    onChange={(e) => setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))}
                    onInput={() => {
                         setInvalidFields && setInvalidFields([]);
                    }}
               />
               {invalidFields?.some((el) => el.name === nameKey) && (
                    <small className="text-main text-[10px] italic">
                         {invalidFields.find((el) => el.name === nameKey)?.mes}
                    </small>
               )}
          </div>
     );
};
export default memo(InputField);
