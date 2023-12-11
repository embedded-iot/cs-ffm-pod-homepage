import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './style.scss';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 35,
    }}
    spin
  />
);


export default function SpinnerBox() {
  return (
    <div className='spinner-box__wrapper'>
      <Spin indicator={antIcon} />
    </div>
  );
}
