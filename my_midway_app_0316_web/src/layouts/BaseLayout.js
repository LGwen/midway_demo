import ProLayout from '@ant-design/pro-layout';
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import RightContent from './components/rightContent';
import defaultProps from './defaultMenu';

export default function (props) {
  const [pathname, setPathname] = useState('/welcome');
  const { children } = props;
  const actionRef = useRef();
  const routeTo = (path) => {
    setPathname(path || '/home');
    history.push(path);
  };

  return (
    <ProLayout
      {...defaultProps}
      actionRef={actionRef}
      rightContentRender={() => <RightContent />}
      location={{ pathname }}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            routeTo(item.path);
          }}
        >
          {dom}
        </a>
      )}
    >
      {children}
    </ProLayout>
  );
}
