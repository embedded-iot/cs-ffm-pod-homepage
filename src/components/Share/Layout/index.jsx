'use client';

import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import {usePathname} from "next/navigation";

import './style.scss';

const { Header, Footer, Content } = Layout;

const TabletAndDesktopLayout = props => {
  const {isTablet} = props;
  return (
    <Layout className={`public-layout__wrapper ${isTablet ? 'public-layout__wrapper--tablet' : 'public-layout__wrapper--desktop'}`}>
      <Header>
        {props.header}
      </Header>
      {
        !!props.content && (
          <Content>
            {props.content}
          </Content>
        )
      }
      {
        !!props.footer && (
          <Footer>
            {props.footer}
          </Footer>
        )
      }
    </Layout>
  )
}

const MobileLayout = props => {
  const [isMenu, setMenu] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    setMenu(isMenu ? false : isMenu);
    // eslint-disable-next-line
  }, [pathName])
  const MenuIcon = isMenu ? CloseOutlined : MenuOutlined;
  return (
    <Layout className={`public-layout__wrapper public-layout__wrapper--mobile ${!!isMenu && 'show-menu'}`}>
      <Header>
        {props.header}
        <MenuIcon className="menu-icon" style={{ fontSize: 20}} onClick={() => setMenu(!isMenu)} />
      </Header>
      {
        !!props.content && (
          <Content>
            {props.content}
          </Content>
        )
      }
      {
        !!props.footer && (
          <Footer>
            {props.footer}
          </Footer>
        )
      }
    </Layout>
  )
}

const PublicLayoutWrapper = (props) => {
  const {isMobile} = props;
  const pathName = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [pathName])
  return isMobile ? <MobileLayout {...props} /> : <TabletAndDesktopLayout {...props} />;
}

PublicLayoutWrapper.propTypes = {
  header: PropTypes.element,
  content: PropTypes.element,
  footer: PropTypes.element,
};

export default PublicLayoutWrapper;
