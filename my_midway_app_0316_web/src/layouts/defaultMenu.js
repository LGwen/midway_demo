import React from 'react';
import {
  // SmileOutlined,
  CrownOutlined,
  // TabletOutlined,
  // AntDesignOutlined,
} from '@ant-design/icons';
// 获取页面路由
export default {
  route: {
    path: '/',
    routes: [
      // {
      //   path: '/home',
      //   name: '欢迎',
      //   icon: <SmileOutlined />,
      //   component: '@/pages/home/index.tsx',
      // },
      {
        path: '/user',
        name: '用户中心',
        icon: <CrownOutlined />,
        component: '@/pages/user/index.tsx',

      },
      // {
      //   path: 'https://ant.design',
      //   name: 'Ant Design 官网外链',
      //   icon: <AntDesignOutlined />,
      // },
    ],
  },
  location: {
    pathname: '/',
  },
};
