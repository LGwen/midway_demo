import { addUser, updateUser, queryUserList, deleUserById } from '../services';
import { waitTime } from '@/utils/utils';

export default {
  namespace: 'userModel',
  state: {
    name: '',
    dataList: [],
    query: {
      pageNumber: 0,
      pageSize: 10,
    },
  },
  effects: {
    *addUser({ payload }, { call }) {
      yield waitTime(1000);
      return yield call(addUser, payload);
    },
    *updateUser({ payload }, { call }) {
      yield waitTime(1000);
      return yield call(updateUser, payload);
    },
    *getDataList({ payload }, { call, put, select }) {
      const {
        userModel: { query },
      } = yield select(({ userModel }) => ({ userModel }));
      const { pageNumber, pageSize } = { ...query, ...payload };
      const { data } = yield call(queryUserList, { pageNumber, pageSize });

      yield put({ type: 'updateState', payload: { dataList: data } });
    },
    *deleteUser({ payload }, { call, put }) {
      const { success } = yield call(deleUserById, payload);
      if(success){
        yield put({type:'getDataList'});
      }
      // yield put({ type: 'updateState', payload: { dataList: data } });
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
