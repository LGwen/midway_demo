export const routes = [
  {
    path: '/',
    component: '@/layouts/index.js',
    routes: [
      {
        path: '/404',
        exact: true,
        component: '@/pages/404.tsx',
      },
      // {
      //   path: '/home',
      //   exact: true,
      //   component: '@/pages/home/index.jsx',
      // },
      {
        path: '/login',
        exact: true,
        component: '@/pages/login/index.js',
      },
      {
        path: '/user',
        exact: true,
        component: '@/pages/user/index.js',
      },
      {
        path: '/user/add',
        exact: true,
        component: '@/pages/user/add/index.js',
      },
    ],
  },
];
