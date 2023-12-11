import React from 'react';
import { Drawer } from 'antd';

import './style.scss';

export const DRAWER_TYPES = {
  TOP_DRAWER: 'top',
  BOTTOM_DRAWER: 'bottom',
  LEFT_DRAWER: 'left',
  RIGHT_DRAWER: 'right',
}

export default function DrawerView({ type = DRAWER_TYPES.TOP_DRAWER,  open, form, className, children, title, hideCancelBtn = false, hideOklBtn = false, okText, cancelText, onCancel, onOk, ...restProps }) {
  return (
    <Drawer
      open={open}
      title={title}
      placement={type}
      className={`modal-view__container ${className}`}
      okText={okText || "Ok"}
      cancelText={ cancelText || "Cancel"}
      onClose={onCancel}
      closable={true}
      maskClosable={true}
      onOk={() => {
        if (!form) {
          onOk();
          return;
        }
        form
          .validateFields()
          .then((values) => {
            // form.resetFields();
            onOk(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      { ...restProps }
    >
      {
        children
      }
    </Drawer>
  );
}
