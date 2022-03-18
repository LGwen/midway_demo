import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { history } from 'umi';
import { waitTime } from '@/utils/utils';

import ss from './index.less';

const Loading = () => {
  const { isLogin } = useSelector(({ global }) => global);

  useEffect(() => {
    const goTo = async(path)=>{
      // 模拟等待1s
      await waitTime(1000);
      history.push(path);
    }
    if (isLogin) {
      goTo('/user');
    } else {
      history.replace('/login');
    }
  }, [isLogin]);

  return (
    <div className={ss.root}>
      <Spin />
    </div>
  );
};
export default Loading;
