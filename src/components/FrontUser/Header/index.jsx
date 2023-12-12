'use client';

import React, {useEffect, useState} from 'react';
import UserActions from 'components/FrontUser/UserActions';
import { WEBSITE_NAME } from 'components/contants';
import logo from 'public/images/logo.png';
import SearchDrawerBox from '../SearchDrawerBox';
import {events} from "utils";
import PublicSider from "../Sider";

import './style.scss';

export default function PublicHeader() {
  const [openSearch, setOpenSearch] = useState(false);
  const systemConfigs = [];
  const redirectTo = () => {}
  const searchListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe("SEARCH_PRODUCT_DRAWER_LISTENER", ({ key, record }) => {
      setOpenSearch(true);
    });
    return reloadListener;
  }

  useEffect(() => {
    const reloadListener = searchListenerFunc();
    return () => {
      reloadListener && reloadListener.remove();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="header__wrapper">
      <div className='logo-portal'>
        <a href='/'>
          <img src={logo} alt={WEBSITE_NAME} />
        </a>
      </div>
      <div className="header__actions">
        <div className="header__menu">
          <PublicSider />
        </div>
        <UserActions
          redirectTo={redirectTo}
          onSearch={() => setOpenSearch(true)}
        />
      </div>
      {
        openSearch && (
          <SearchDrawerBox
            redirectTo={redirectTo}
            open={openSearch}
            onOk={() => {}}
            systemConfigs={systemConfigs}
            onCancel={() => setOpenSearch(false)}
          />
        )
      }
    </div>
  );
}