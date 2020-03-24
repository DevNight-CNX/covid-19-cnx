import { Modal as AntdModal } from 'antd';
import Buttons from 'components/Button';
import styled from 'styled-components';

const Modal = styled(AntdModal)`
  max-width: 360px;
  p {
    ${({ theme }) => theme.typography.body()};
    color: ${({ theme }) => theme.color.neutralColor.black};
    margin: 0;
  }
  .ant-modal-content {
    .ant-modal-close {
      display: none;
    }
    .ant-modal-header {
      height: 57px;
      display: flex;
      align-items: center;
      padding: 21px 30px 15px;
      .ant-modal-title {
        ${({ theme }) => theme.typography.body()};
        color: ${({ theme }) => theme.color.neutralColor.black};
      }
    }
    .ant-modal-body {
      padding: 13px 32px 15px;
    }

    .ant-modal-footer {
      justify-content: flex-end;
      display: flex;
    }
  }
`;

const ButtonCloseModal = styled(Buttons)`
  && {
    width: 87px;
    height: 36px;
  }
`;

export { Modal, ButtonCloseModal };
