'use client'

import React from 'react'
import {
  ConfigProvider,
} from 'antd'
import theme from './themeConfig'

import styled, {createGlobalStyle} from 'styled-components';
import PublicLayoutWrapper from "components/Share/Layout";
import FrontUserHeader from "components/FrontUser/Header";
import {RESPONSIVE_MEDIAS, WEBSITE_NAME} from "components/contants";
import FrontUserSider from "components/FrontUser/Sider";
import FrontUserFooter from "components/FrontUser/Footer";
import { ConnectedRouter } from 'connected-next-router';
import { wrapper } from './configStore';
// import { useSelector } from 'react-redux'

import { useMediaQuery } from 'react-responsive';

const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;


const HomePage = (props) => {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const currentRouter = props.router?.location?.pathname;
  const selectedRouters = [currentRouter];
  // const routerState = useSelector(state => state.router)
  // console.log(routerState)
  const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: #028BBF;
    --heading-font-size: ${isMobile ? '48px' : '64px'};
    --heading-line-height: ${isMobile ? '55px' : '54px'};
    --title-font-size: ${isMobile ? '24px' : '48px'};
    --title-line-height: ${isMobile ? '30px' : '55px'};
    --description-font-size: ${isMobile ? '14px' : '16px'};
    --description-line-height: ${isMobile ? '16px' : '24px'};
  }
`;
  const redirectTo = path => {
    props.push(path);
  }

  return (
    <ConfigProvider theme={theme}>
      <AppWrapper>
        <GlobalStyles isMobile={isMobile} />
        <PublicLayoutWrapper
          // header={(
          //   <FrontUserHeader
          //     logoName={WEBSITE_NAME}
          //     sider={<FrontUserSider selectedRouters={selectedRouters} redirectTo={redirectTo} />}
          //     redirectTo={redirectTo}
          //     systemConfigs={props.systemConfigs}
          //   />
          // )}
          footer={<FrontUserFooter systemConfigs={props.systemConfigs} redirectTo={redirectTo}  />}
          router={props.router}
        />
      </AppWrapper>
    </ConfigProvider>
  )
}

export default wrapper.withRedux(HomePage);
