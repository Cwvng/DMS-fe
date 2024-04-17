import React, { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { TextAreaProps } from 'antd/lib/input';

interface FloatLabelTextAreaProps extends TextAreaProps {
  label: string;
}

export const FloatLabelTextArea: React.FC<FloatLabelTextAreaProps> = (props) => {
  const [focus, setFocus] = useState(false);
  let { label, size, value, showCount, autoSize, placeholder, required, ...others } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.toString().length !== 0);

  // Apply Tailwind classes conditionally
  const labelClass = isOccupied
    ? 'absolute left-3 -top-3 text-sm bg-white px-1 ml-[-4px] text-primary transition-all duration-200 z-40'
    : 'absolute left-3 top-2.5 transition-all duration-200 pointer-events-none';

  const requiredMark = required ? <span className="text-red-500">*</span> : null;

  return (
    <div className="relative" onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      <TextArea size="large" autoSize onChange={props.onChange} {...others} />
      <label className={`${labelClass} ${isOccupied ? '' : 'text-gray-500'}`}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>
    </div>
  );
};
