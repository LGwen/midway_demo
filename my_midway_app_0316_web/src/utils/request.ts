import { extend } from 'umi-request';
import { message } from 'antd';
import { history } from 'umi';

const errorHandler = (error: any): any => {
  const { response } = error;
  const status = (response || {}).status || 404;
  return { errMsg: '', success: false, error, status };
};
const PREFIX = '/api';
const request = extend({
  // 默认错误处理
  errorHandler,
  // 默认请求是否带上cookie
  credentials: 'include',
  prefix: PREFIX,
  timeout: 10000,
});

// 响应拦截
const responseInterceptors = async (response: any) => {
  const data = await response.clone().json();
  if (!data.success) {
    const errMsg = data.message;
    message.info(errMsg);
    history.push('/login')
    throw new Error(errMsg);
  }
  return response;
};
/** 附加 登录信息 */
const AddAuthToken = (url: string, options: any | {}) => {
  const author = sessionStorage.getItem('authorization');
  const headToken = author ? { Authorization: author } : {};
  return {
    url,
    options: {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...headToken,
      },
    },
  };
};
request.interceptors.request.use(AddAuthToken);
request.interceptors.response.use(responseInterceptors);
/**
 * GET 请求
 * @param {*} url 请求路径
 * @param {*} params 业务参数
 * @param {*} options 定制化请求参数
 * @param {*} options.cancelToken 由 const { token, cancel } = CancelToken.source();提供，可用 cancel 来中断请求
 */
export const get = (url: string, param?: any, options?: any): any =>
  request.get(url, { ...param, ...options });

/**
 * POST 请求
 * @param {*} url 请求路径
 * @param {*} data body参数
 * @param {*} params query参数
 * @param {*} options 定制化请求参数
 * @param {*} options.cancelToken 由 const { token, cancel } = CancelToken.source();提供，可用 cancel 来中断请求
 */
export const post = (
  url: string,
  data?: any,
  param?: any,
  options?: any,
): any => request.post(url, { data, ...param, ...options });
