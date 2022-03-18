import React from 'react';
import { Redirect } from 'umi';
import BaseLayout from './BaseLayout.js';

export default function (props) {
  const { children, location } = props;
  // 空白页面
  const simplePagePath = ['/login', '/loading'];
  const isSimple = simplePagePath.find((s) => s === location.pathname);
  if (isSimple) {
    return children;
  }
  if (location.pathname === '/') return <Redirect to="/home" />;
  return <BaseLayout {...props} />;
}
