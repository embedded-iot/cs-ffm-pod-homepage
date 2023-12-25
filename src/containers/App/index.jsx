'use client'

/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


import { events } from 'utils';


import PublicLayoutWrapper from 'components/Share/Layout';

import FrontUserHeader from 'components/FrontUser/Header';
import FrontUserFooter from 'components/FrontUser/Footer';
import FrontUserSider from 'components/FrontUser/Sider';

import SpinnerBox from 'components/Common/SpinnerBox';

import {
  WEBSITE_NAME,
} from 'components/contants';

import './style.scss';
import {useAppSelector} from "../../store/hooks";
import {useRouter} from "next/navigation";
import {usePathname} from "next/dist/client/components/navigation";

const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;


const App = ({ children, categories, collections, }) => {
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
  const systemConfigs = useAppSelector(state => state.data.systemConfigs);
  const isMobile = useAppSelector(state => state.data.isMobile);
  const isTablet = useAppSelector(state => state.data.isTablet);
  const isDesktop = useAppSelector(state => state.data.isDesktop);
  const router = useRouter();
  const currentRouter = usePathname();

  const redirectTo = path => {
    router.push(path);
  }

  const spinnerListenerFunc = () => {
    let statusListener = null;
    statusListener = events.subscribe("SPINNER_LISTENER", (show = false) => {
      setIsLoadingSpinner(prevShow => prevShow !== show ? show : true);
    });
    return statusListener;
  }


  useEffect(() => {
    const spinnerListener = spinnerListenerFunc();
    return () => {
      spinnerListener && spinnerListener.remove();
    };
    // eslint-disable-next-line
  }, []);
  const selectedRouters = [currentRouter];

  return (
    <AppWrapper>
      <PublicLayoutWrapper
        isMobile={isMobile}
        isTablet={isTablet}
        isDesktop={isDesktop}
        header={(
          <FrontUserHeader
            logoName={WEBSITE_NAME}
            sider={(
              <FrontUserSider
                categories={categories}
                collections={collections}
                selectedRouters={selectedRouters}
                redirectTo={redirectTo}
              />
            )}
            redirectTo={redirectTo}
            systemConfigs={systemConfigs}
          />
        )}
        content={children}
        footer={<FrontUserFooter systemConfigs={systemConfigs} redirectTo={redirectTo}  />}
      />
      { isLoadingSpinner && <SpinnerBox /> }
    </AppWrapper>
  );
}

export default App;
