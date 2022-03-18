import { post } from '@/utils/request';
import { userProps } from './interface';

/**
 * 查询用户列表
 * @param user
 * @returns
 */
export const login = (query: userProps) => post('/sys/login', { ...query });

export const logout = () => post('/sys/logout');
