import { get } from '@/utils/request';

export const getDashboardInfo = () => get('/dashboard/info');

// export const removeUser = (id: number) => post('/user/remove', { id });