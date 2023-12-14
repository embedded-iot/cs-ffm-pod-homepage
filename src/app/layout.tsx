import React from 'react'

import StyledComponentsRegistry from './AntdRegistry';
import StoreProvider from 'store/Provider';
import {ConfigProvider} from "antd";
import theme from "./themeConfig";
import App from "containers/App";
import './globals.scss'
import 'scss/style.scss';


interface RootLayoutProps {
  children: React.ReactNode
}

async function RootLayout({ children }: RootLayoutProps) {
    // const currentRouter = router?.location?.pathname;
    // const selectedRouters = [currentRouter];
    // const routerState = useSelector(state => state.router)
    // console.log(routerState)

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
          <StoreProvider>
            <ConfigProvider theme={theme}>
              <App>{children}</App>
            </ConfigProvider>
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
