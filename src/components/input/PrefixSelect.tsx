import { ReactNode } from 'react';
import { Select, SelectProps } from 'antd';
import styled from 'styled-components';

type PrefixSelectProps = SelectProps & {
  prefixIcon?: ReactNode;
};

const SelectWrapper = styled.div`
  position: relative;

  .prefix-icon-wrapper {
    position: absolute;
    z-index: 1;
    width: 2rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  && .ant-select .ant-select-selector {
    padding-left: calc(3rem - 8px);
  }
`;
const PrefixSelect: React.FC<PrefixSelectProps> = ({
  prefixIcon,
  children,
  ...rest
}: PrefixSelectProps) => {
  return (
    <SelectWrapper>
      {prefixIcon && <div className="prefix-icon-wrapper">{prefixIcon}</div>}
      <Select {...rest}>{children}</Select>
    </SelectWrapper>
  );
};

export default PrefixSelect;
