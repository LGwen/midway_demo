import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Table, Popconfirm, Divider } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';

const User = ({ dispatch, userModel }) => {
  const { dataList } = userModel;
  const [dataSource, setDds] = useState([]);
  useEffect(() => {
    const _dataList = (dataList || []).map((item) => {
      return { key: item.id, ...item };
    });
    setDds(_dataList);
  }, [dataList]);

  useEffect(() => {
    dispatch({
      type: 'userModel/getDataList',
      payload: {},
    });
  }, []);

  const addUser = () => {
    history.push('/user/add');
  };

  const editUser = (record) => {
    history.push({
      pathname: '/user/add',
      params: {...record,type:'edit'},
    });
  }

  const confirm = (record) => {
    const { id } = record;
    dispatch({
      type: 'userModel/deleteUser',
      payload: { id },
    });
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '操作',
      width: 120,
      render: (record) => {
        return (
          <div>
            <a onClick={()=>{editUser(record)}}>编辑</a>
            <Divider type='vertical' />
            <Popconfirm
              placement="topLeft"
              title={`确认删除用户：${record.name}`}
              onConfirm={() => {
                confirm(record);
              }}
              okText="Yes"
              cancelText="No"
            >
              <a>删除</a>
            </Popconfirm>
          </div>

        );
      },
    },
  ];

  return (
    <PageContainer
      fixedHeader
      extra={[
        <Button key="add" onClick={addUser}>
          新增用户
        </Button>,
      ]}
      header={{
        title: <span>用户中心</span>,
        breadcrumb: {
          routes: [
            {
              path: '',
              breadcrumbName: '用户中心',
              key: 11111,
            },
          ],
        },
      }}
    >
      <Card>
        <Table bordered columns={columns} dataSource={dataSource} />
      </Card>
    </PageContainer>
  );
};
export default connect(({ userModel }) => ({ userModel }))(User);
