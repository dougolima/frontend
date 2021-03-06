import 'antd/lib/modal/style/index.css';
import styled from 'styled-components/macro';
import AntModal from 'antd/lib/modal';

import { get } from '@styles/utils';

const Modal = styled(AntModal)`
  .ant-btn:not([class*='ant-btn ']):hover,
  .ant-btn:not([class*='ant-btn ']):focus {
    border-color: ${get('colors.accent')};
    color: ${get('colors.accent')};
  }

  .ant-btn-primary {
    background-color: ${get('colors.accent')};
    border-color: ${get('colors.accent')};

    &:hover {
      background-color: ${get('colors.accentSecondary')};
      border-color: ${get('colors.accentSecondary')};
    }
  }

  .ant-btn-secondary {
    background-color: ${get('colors.accentSecondary')};
    border-color: ${get('colors.accentSecondary')};
    color: ${get('colors.commonLighter')};

    &:hover {
      background-color: ${get('colors.accent')};
      border-color: ${get('colors.accent')};
      color: ${get('colors.commonLighter')};
    }
  }
`;

export default Modal;
