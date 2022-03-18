import { post } from '@/utils/request';
import { userProps, queryUserProps } from './interface';

/**
 * 新增用户
 */
export const addUser = (user: userProps) => post('/user/add', { ...user });
export const updateUser = (user: userProps) => post('/user/update', { ...user });
export const removeUser = (id: number) => post('/user/remove', { id });

/**
 * 查询用户列表
 * @param user
 * @returns
 */
export const queryUserList = (query: queryUserProps) =>
  post('/user/list', { ...query });

/**
 * 删除用户
 *  @param {string} id 用户id
 */

export const deleUserById = (id: Number) =>
  post('/user/delete', { id })
