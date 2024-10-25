import clsx from 'clsx';
import React, { memo } from 'react';

function InputForm({ label, disabled, register, errors, id, validate, type = 'text', placeholder, fw, defaultValue }) {
     return (
          <div className="flex flex-col h-[80px] justify-center gap-2">
               {label && <label htmlFor={id}>{label}</label>}
               <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...register(id, validate)}
                    defaultValue={defaultValue}
                    className={clsx('form-input my-auto', fw && 'w-full')}
               />
               {errors[id] && <small className="text-sm text-red-500">{errors[id]?.message}</small>}
          </div>
     );
}

export default memo(InputForm);
