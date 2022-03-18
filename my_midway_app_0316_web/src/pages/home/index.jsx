import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import ss from './index.less';
import Subjects from './components/Subjects/index.js';

export default function IndexPage() {
  const dispatch = useDispatch();
  const { dataList } = useSelector(({ dashboard }) => dashboard);
  useEffect(() => {
    dispatch({
      type: 'dashboard/getDashboardInfo',
    });
  }, []);
  return (
    <div className={ss.root}>
      <Subjects list={dataList} />
    </div>
  );
}
