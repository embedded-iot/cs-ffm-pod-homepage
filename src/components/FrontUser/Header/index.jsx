'use client';

import React, {useEffect, useState} from 'react';
import UserActions from 'components/FrontUser/UserActions';
import { WEBSITE_NAME } from 'components/contants';
import logo from 'public/images/logo.png';
import SearchDrawerBox from '../SearchDrawerBox';
import Icon from "components/Common/Icon";
import {events} from "utils";

import './style.scss';

export default function PublicHeader({ sider, systemConfigs, redirectTo }) {
  const [openSearch, setOpenSearch] = useState(false);
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
          <Icon src={logo} alt={WEBSITE_NAME} height={30} />
        </a>
      </div>
      <div className="header__actions">
        <div className="header__menu">
          {sider}
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
