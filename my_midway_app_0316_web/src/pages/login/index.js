import { Button, Form, Input } from 'antd';
import { connect } from 'dva';
import React from 'react';
import { history } from 'umi';

import ss from './index.less';

const FormItem = Form.Item;

const Login = ({ dispatch, loading }) => {
  const [form] = Form.useForm();
  const onSubmit = (values) => {
    // console.log('finish:', values);
    dispatch({
      type: 'global/login',
      payload: values,
    }).then((success) => {
      // 跳转到loading界面
      if (success) history.replace('/loading');
    });
  };

  return (
    <div className={ss.root}>
      <div className={ss.cover} />
      <div className={ss.loginForm}>
        <div className={ss.header}>Midway</div>

        <Form form={form} onFinish={onSubmit}>
          <FormItem
            rules={[
              {
                required: true,
                message: '请输入帐号',
              },
            ]}
            name="username"
          >
            <Input placeholder="请输入帐号" />
          </FormItem>
          <FormItem
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
            name="pwd"
          >
            <Input placeholder="请输入密码" type="password" />
          </FormItem>
          <FormItem>
            <Button
              className={ss.signin}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              登陆
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};
export default connect(({ loading }) => ({
  loading: loading.effects['golbal/login'],
}))(Login);
