import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

export default function PageContainerEl({ children, ...otherProps }) {
  return (
    <PageContainer fixedHeader {...otherProps}>
      {children}
    </PageContainer>
  );
}
