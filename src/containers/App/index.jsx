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


import { events, globalStore } from 'utils';


import PublicLayoutWrapper from 'components/Share/Layout';

import FrontUserHeader from 'components/FrontUser/Header';
import FrontUserFooter from 'components/FrontUser/Footer';
import FrontUserSider from 'components/FrontUser/Sider';

import SpinnerBox from 'components/Common/SpinnerBox';

import {
  WEBSITE_NAME,
} from 'components/contants';

import {
  FrontUserEventsService,
  SellerSystemService,
} from 'services';

import './style.scss';
import {setGlobalStore} from "../../store/slices";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useRouter} from "next/navigation";
import {usePathname} from "next/dist/client/components/navigation";

const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;


const App = ({ children, ...props }) => {
  const [isLoadedCurrentEvent, setIsLoadedCurrentEvent] = useState(false);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
  const systemConfigs = useAppSelector(state => state.data.systemConfigs);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentRouter = usePathname();

  const redirectTo = path => {
    router.push(path);
  }

  const getCurrentEvent = () => {
    FrontUserEventsService.getCurrentEvent((response) => {
      globalStore.set({
        event: response
      });
      setIsLoadedCurrentEvent(true);
    } , () => {
      globalStore.set({
        event: {
          discountPercent: 0
        }
      });
      setIsLoadedCurrentEvent(true);
    });
  }

  const getSystemConfigs = () => {
    SellerSystemService.getSystemConfigs({}, response => {
      dispatch(setGlobalStore({
        systemConfigs: SellerSystemService.getActivatedSystemConfigs(response.items),
      }));
    }, () => {})
  }

  const systemConfigsListenerFunc = () => {
    let listener = null;
    listener = events.subscribe("SYSTEM_CONFIGS_LISTENER", () => {
      getSystemConfigs()
    });
    return listener;
  }

  const spinnerListenerFunc = () => {
    let statusListener = null;
    statusListener = events.subscribe("SPINNER_LISTENER", (show = false) => {
      setIsLoadingSpinner(prevShow => prevShow !== show ? show : true);
    });
    return statusListener;
  }

  useEffect(() => {
    let notificationInterval = null;
    getSystemConfigs();
    const systemConfigsListener = systemConfigsListenerFunc();
    return () => {
      notificationInterval && clearInterval(notificationInterval);
      systemConfigsListener && systemConfigsListener.remove();
    }
    // eslint-disable-next-line
  }, [props.isLogin]);

  useEffect(() => {
    getCurrentEvent();
    const spinnerListener = spinnerListenerFunc();
    return () => {
      spinnerListener && spinnerListener.remove();
    };
    // eslint-disable-next-line
  }, []);
  const selectedRouters = [currentRouter];
  // if (!isLoadedCurrentEvent) return null; @todo load event is missing

  return (
    <AppWrapper>
      <PublicLayoutWrapper
        header={(
          <FrontUserHeader
            logoName={WEBSITE_NAME}
            sider={(
              <FrontUserSider
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
