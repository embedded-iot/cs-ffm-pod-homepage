import React from 'react'

import StyledComponentsRegistry from './AntdRegistry';
import StoreProvider from 'store/Provider';
import {ConfigProvider} from "antd";
import theme from "./themeConfig";
import App from "containers/App";
import useMedia from "hooks/useMedia";
import {FrontUserCategoriesService, FrontUserEventsService, SellerSystemService} from "services";
import {globalStore} from "utils";

import './globals.scss'
import 'scss/style.scss';


interface RootLayoutProps {
  children: React.ReactNode
}

async function RootLayout({ children }: RootLayoutProps) {
  const { deviceType, isMobile, isTablet, isDesktop } = useMedia();
  const systemConfigs = await new Promise((resolve, reject) => {
    SellerSystemService.getSystemConfigs({}, response => {
      resolve(SellerSystemService.getActivatedSystemConfigs(response.items))
    }, reject);
    }
  );
  const categories = await new Promise((resolve, reject) => {
    FrontUserCategoriesService.getCategoriesTree( resolve, reject);
    }
  );
  const collections = await new Promise((resolve, reject) => {
    FrontUserCategoriesService.getCollections( resolve, reject);
    }
  );
  try {
    const event = await new Promise((resolve, reject) => {
        FrontUserEventsService.getCurrentEvent(resolve, reject);
      }
    );
    globalStore.set({
      event
    });
  } catch (e) {
    globalStore.set({
      event: {
        discountPercent: 0
      }
    });
  }

  return (
    <html lang="en">
      <header>
        <meta charSet="utf-8"/>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
        <meta httpEquiv="Pragma" content="no-cache"/>
        <meta httpEquiv="Expires" content="0"/>
        <meta name="viewport"
              content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        <meta name="theme-color" content="#000000"/>
        <meta property="og:url" content="https://monsprints.com/"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="MonsPrints | Print on Demand & Fulfillment Service"/>
        <meta property="og:description" content="Create & manage orders quickly, solve seller's supply problems. Sign up now for free to start selling"/>
        <meta property="og:image" content="https://monsprints.com/uploads/files/monsprints-logo.png"/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="monsprints.com"/>
        <meta property="twitter:url" content="https://monsprints.com/"/>
        <meta name="twitter:title" content="MonsPrints | Print on Demand & Fulfillment Service"/>
        <meta name="twitter:description" content="Create & manage orders quickly, solve seller's supply problems. Sign up now for free to start selling"/>
        <meta name="twitter:image" content="https://monsprints.com/uploads/files/monsprints-logo.png"/>
      </header>
      <body>
        <StyledComponentsRegistry>
          <StoreProvider value={{ deviceType, isMobile, isTablet, isDesktop, systemConfigs, categories, collections }}>
            <ConfigProvider theme={theme}>
              <App categories={categories} collections={collections}>
                {children}
              </App>
            </ConfigProvider>
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
