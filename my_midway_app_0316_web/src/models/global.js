import { login, logout } from '@/services/login';

const globalModel = {
  namespace: 'global',
  state: {
    isLogin: false,
    token: null,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      const { success, data } = res;
      if (success) {
        sessionStorage.setItem('authorization', data);
        yield put({ type: 'updateState', payload: { isLogin: true } });
        yield put({ type: 'updateState', payload: { token: data } });
      }
      return data;
    },
    *logout(_, { call, put }) {
      const res = yield call(logout);
      const { success } = res;
      if (success) {
        sessionStorage.removeItem('authorization');
        yield put({ type: 'updateState', payload: { isLogin: false } });
        yield put({ type: 'updateState', payload: { token: undefined } });
      }
      return success;
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default globalModel;
