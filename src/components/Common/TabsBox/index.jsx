import React from 'react';
import { Tabs } from 'antd';

import './style.scss';

export default function TabsBox({ defaultActiveKey, className, items = [], name, onChange = () => {}, ...restProps }) {
  const handleChange = (key) => {
    onChange(key, name);
  };
  return (
    <div className={className || "tabs-box"}>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        onChange={handleChange}
        items={items}
        {...restProps}
      />
    </div>
  )
}
