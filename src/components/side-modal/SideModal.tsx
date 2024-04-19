import styled from 'styled-components';
import { Modal, ModalProps } from 'antd';

export const SideModal = styled((props: ModalProps) => <Modal {...props} />)`
  float: right;
  top: 0;
  margin: 0;
  &.ant-modal {
    height: 100vh;
    .ant-modal-content {
      height: 100vh;
    }
  }
`;
