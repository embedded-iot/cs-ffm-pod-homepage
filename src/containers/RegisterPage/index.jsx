'use client';

import React from 'react';
import { notification } from 'antd';
import RegisterForm from 'components/Share/RegisterForm';
import { BaseService, UserService } from 'services';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import NormalContent from 'components/Share/NormalContent';
import { useMediaQuery } from 'react-responsive';
import {useRouter, useSearchParams} from "next/navigation";
import queryString from "query-string";

import './style.scss'

const RegisterPage = (props) => {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const searchParams = useSearchParams();
  const queryParams = queryString.parse(searchParams.toString());
  const router = useRouter();
  const { codeRef } = queryParams;
  const onFinish = (values) => {
    const { confirmPassword, ...data} = values;
    if (!data.codeRef) {
      delete data.codeRef;
    }
    UserService.register(data, response => {
      notification.success({
        message: "Register successful! Please check the email and active your account!",
      });
      router.push(ROUTERS.ROOT);
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Register failure!"),
      });
    });
  }

  return (
    <div className="page-wrapper--full-width sign-up__wrapper">
      <div className="page-contents sign-up__contents">
        <NormalContent style={{ background: isMobile && '#fff'}}>
          <div className="sign-up__box">
            {/*<div className='sign-up__logo'>*/}
            {/*  <Logo src={logoImg} height={isMobile ? 38 : 40}/>*/}
            {/*</div>*/}
            <RegisterForm onFinish={onFinish}
                          redirectTo={router.push}
                          hasBoxCard={!isMobile}
                          initialValues={{ codeRef }}
            />
          </div>
        </NormalContent>
      </div>
    </div>
  );
}

export default RegisterPage;
