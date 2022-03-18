import { Col, Row, Card, Statistic } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';

const Subjects = (props) => {
  const { list = [] } = props;
  return (
    <Row gutter={16}>
      {list.map((l) => (
        <Col span={6} key={l.id}>
          <Card>
            <Statistic
              title={l.title}
              value={l.number}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default Subjects;
