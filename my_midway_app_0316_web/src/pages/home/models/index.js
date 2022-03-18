import { getDashboardInfo } from '../services';

const homeModel = {
  namespace: 'dashboard',
  state: {
    dataList: [],
  },
  effects: {
    *getDashboardInfo({ payload }, { call, put }) {
      const { success, data } = yield call(getDashboardInfo, payload);
      if (success)
        yield put({ type: 'updateState', payload: { dataList: data } });
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
export default homeModel;
