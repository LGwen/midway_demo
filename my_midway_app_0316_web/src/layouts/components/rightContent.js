import React from 'react';
import { useDispatch } from 'dva';
import { history } from 'umi';
import { LogoutOutlined } from '@ant-design/icons';
import ss from '../index.less';


const RightContent = () => {
  const dispatch = useDispatch();
  const logout = async () => {
    const success = await dispatch({
      type: 'global/logout',
      payload: {},
    });
    if (success) {
      history.push('/login');
    }
  };
  return (
    <div onClick={logout} className={ss.pointer}>
      <LogoutOutlined />
      <span>退出登录</span>
    </div>
  );
};
export default RightContent;
