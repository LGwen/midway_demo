// https://umijs.org/config/
import { defineConfig } from 'umi';
import proxy from './proxy';
// import { routes } from './customer-routers';
// REACT_APP_ENV,
const { NODE_ENV } = process.env;
const basePath = NODE_ENV === 'development' ? '/' : '/admin/';
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },

  targets: {
    ie: 11,
  },
  // routes,
  publicPath: basePath,
  base: basePath,
  title: false,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  proxy: proxy.dev,
  fastRefresh: {},
  devtool: 'source-map',
  devServer: {
    https: false,
    compress: false,
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
});
