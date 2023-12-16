import React from 'react';
import { Button, Form } from 'antd';
import BoxHeader from 'components/Share/BoxHeader';
import BoxCard from 'components/Share/BoxCard';
import InputText from 'components/Common/InputText';
import InputPassword , { validatePassword } from 'components/Common/InputPassword';
import { getSellerUrl } from 'services/BaseService';
import { ROLE_VALUES, ROUTERS, ROLES_LABEL_VALUE_OPTIONS } from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';

import './style.scss';

export default function RegisterForm({ onFinish = () => {}, initialValues, hasBoxCard = true }) {
  // eslint-disable-next-line
  const BoxWrapper = hasBoxCard ? BoxCard : 'div';
  const roles = ROLES_LABEL_VALUE_OPTIONS.filter(role => [ROLE_VALUES.RESELLER, ROLE_VALUES.PRODUCER].includes(role.value));
  return (
    <BoxWrapper className="sign-up-form__wrapper" style={{ width: hasBoxCard && 400 }}>
      <BoxHeader
        title="Sign up"
        description="Log in with your data that you entered during registration."
      />
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        initialValues={{
          role: ROLE_VALUES.RESELLER,
          ...initialValues
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Email is invalid!',
            },
            {
              required: true,
              message: 'Please enter email!',
            },
          ]}
          style={{ marginBottom: 20}}
        >
          <InputText placeholder="Email"/>
        </Form.Item>
        <Form.Item>
          <div className="sign-up-form__email-note">
            Please enter the correct email to receive the account verification code
          </div>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter password!',
            },
            validatePassword,
          ]}
        >
          <InputPassword placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Please enter phone!',
            },
          ]}
        >
          <InputText placeholder="Phone" />
        </Form.Item>

        <Form.Item
          name="storeName"
          rules={[
            {
              required: true,
              message: 'Please enter store name!',
            },
          ]}
        >
          <InputText placeholder="Store Name"  />
        </Form.Item>
        <Form.Item
          name="codeRef"
        >
          <InputText placeholder="Code Ref"  />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[
            {
              required: true,
              message: 'Please select role!',
            },
          ]}
        >
          <DropdownSelect
            options={roles}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size='large' htmlType="submit" className="ant-btn--full-width">
           Sign Up Now
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="sign-up-form__note">
            Already have an account? <span className="link" onClick={() => window.open(getSellerUrl() + ROUTERS.LOGIN,'_self')}>Log In</span>
          </div>
        </Form.Item>
      </Form>
    </BoxWrapper>
  );
}
