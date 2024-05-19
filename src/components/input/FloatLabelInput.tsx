import React, { useState } from 'react';
import { Input, InputProps } from 'antd';

interface FloatLabelInputProps extends InputProps {
  label: string;
}

export const FloatLabelInput: React.FC<FloatLabelInputProps> = (props) => {
  const [focus, setFocus] = useState(false);
  let { label, size, value, placeholder, type, required, ...others } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || value !== ' ';

  const labelClass = isOccupied
    ? 'absolute left-3 -top-3 text-sm bg-white px-1 ml-[-4px] text-primary transition-all duration-200 z-40'
    : 'absolute left-3 top-2.5 text-gray transition-all duration-200 pointer-events-none';

  const requiredMark = required ? <span className="text-red-500">*</span> : null;

  return (
    <div className="relative" onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      {type === 'password' ? (
        <Input.Password
          size="large"
          value={value}
          onChange={props.onChange}
          type={type}
          {...others}
        />
      ) : (
        <Input size="large" value={value} onChange={props.onChange} type={type} {...others} />
      )}
      <label className={`${labelClass} ${isOccupied ? '' : 'text-gray-500'}`}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>
    </div>
  );
};
