import { LeftOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Input, message } from 'antd';
import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import ss from './index.less';

const FormItem = Form.Item;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 },
};
const AddUser = ({ dispatch, onSubmitLoading }) => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState('新增用户');
  const [userInfo, setUserInfo] = useState({});
  const [operation, setOperation] = useState('add');
  useEffect(() => {
    const {
      location: { params = {} },
    } = history;
    const { type } = params;
    if (type === 'edit') setTitle('编辑用户');
    form.setFieldsValue({ ...params });
    setOperation(type || 'add');
    setUserInfo({ ...params });
  }, []);
  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      const params = { ...values };
      if (operation === 'edit') {
        params.id = userInfo.id;
      }
      const op = operation === 'edit' ? 'updateUser' : 'addUser';
      const { success } = await dispatch({
        type: `userModel/${op}`,
        payload: params,
      });
      if (success) {
        message.success('添加成功');
        history.goBack();
      }
    });
  };
  return (
    <PageContainer
      fixedHeader
      header={{
        title: (
          <span onClick={() => history.goBack()}>
            <LeftOutlined />
            <span>{title}</span>
          </span>
        ),
      }}
      footer={[
        <Button key="1">reset</Button>,
        <Button
          type="primary"
          key="2"
          onClick={onSubmit}
          loading={onSubmitLoading}
        >
          submit
        </Button>,
      ]}
    >
      <Card>
        <Form {...layout} form={form} className={ss.root}>
          <FormItem
            label="名称"
            name="name"
            required
            rules={[
              {
                required: true,
              },
              {
                max: 20,
                message: '最多输入20个字符',
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="email" />
          </FormItem>
          <FormItem
            label="密码"
            name="password"
            rules={[
              {
                required: true,
              },
              {
                max: 20,
                message: '最多输入20个字符',
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem label="rememberToken" name="rememberToken">
            <Input />
          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
};
export default connect(({ userModel, loading }) => ({
  userModel,
  onSubmitLoading: loading.effects['userModel/addUser'],
}))(AddUser);
