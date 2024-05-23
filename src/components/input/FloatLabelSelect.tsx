import React, { useState } from 'react';
import { Select, SelectProps } from 'antd';

interface FloatLabelSelectProps extends SelectProps {
  label: string;
}

export const FloatLabelSelect: React.FC<FloatLabelSelectProps> = (props) => {
  const [focus, setFocus] = useState(false);
  let { label, size, value, placeholder, ...others } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || value !== '';

  const labelClass = isOccupied
    ? 'absolute left-3 -top-3 text-sm bg-white px-1 ml-[-4px]  transition-all duration-200'
    : 'absolute left-3 top-2.5 transition-all duration-200 pointer-events-none';

  return (
    <div className="relative" onFocus={() => setFocus(true)}>
      <Select size="large" {...others} />
      <label className={`${labelClass} ${isOccupied ? '' : 'text-gray'}`}>
        {isOccupied ? label : placeholder}
      </label>
    </div>
  );
};
