'use client';

import React from 'react';
import {Col, Divider, Row} from 'antd';
import { SellerSystemService } from 'services';
import { RESPONSIVE_MEDIAS, ROUTERS, STATIC_BLOG_KEYS, SYSTEM_CONFIG_VALUE, WEBSITE_NAME } from 'components/contants';
import { MessengerChat } from 'react-messenger-chat-plugin';
import { useMediaQuery } from 'react-responsive';
import { ArrowUpOutlined } from '@ant-design/icons';
import logo from '/public/images/logo-white.png';
import { getFrontUserUrl } from 'services/BaseService';
import classNames from 'classnames';
import Icon from "components/Common/Icon";
import './style.scss';

export default function Footer() {
  const systemConfigs = [];
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const pageID = SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_FACEBOOK_PAGE_ID);
  const handleIntegrate = (link) => {
    window.open(link, "_blank");
  }
  const handleStaticBlog = (key) => {
    // redirectTo(ROUTERS.FRONT_USER_STATIC_BLOGS + '/' + key);
  }

  const socialLinks = [
    { label: 'Facebook', value: SYSTEM_CONFIG_VALUE.HOME_FACEBOOK },
    { label: 'Zalo', value: SYSTEM_CONFIG_VALUE.HOME_ZALO },
    { label: 'Telegram', value: SYSTEM_CONFIG_VALUE.HOME_TELEGRAM },
    { label: 'Instagram', value: SYSTEM_CONFIG_VALUE.HOME_INSTAGRAM },
    { label: 'Youtube', value: SYSTEM_CONFIG_VALUE.HOME_YOUTUBE },
  ].map((item) => ({
    ...item,
    link: SellerSystemService.getSystemConfigValue(systemConfigs, item.value)
  }));

  const openLink = (link) => {
    window.open(link, "_blank");
  }
  const goToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className={`public-footer__wrapper ${isMobile && 'public-footer__wrapper--mobile'}`}>
      <div className='public-footer__contents'>
        <Row gutter={isMobile ? [0, 24] : [66, 0]}
             className="public-footer__link-list"
        >
          <Col span={isMobile ? 12 : 7}>
            <div className='public-footer__title'>Support</div>
            <div className='public-footer__description' onClick={() => handleStaticBlog(STATIC_BLOG_KEYS.ABOUT_US)}>About Us</div>
            <div className='public-footer__description' onClick={() => handleStaticBlog(STATIC_BLOG_KEYS.CONTACT_US)}>Contact Us</div>
            <div className='public-footer__description' onClick={() => handleStaticBlog(STATIC_BLOG_KEYS.TERM_OF_SERVICE)}>Term of Services</div>
            <div className='public-footer__description' onClick={() => handleStaticBlog(STATIC_BLOG_KEYS.RETURN_AND_REFUND_POLICIES)}>Return And Refund Policies</div>
            <div className='public-footer__description' onClick={() => handleStaticBlog(STATIC_BLOG_KEYS.PRIVACY_POLICY)}>Privacy Policy</div>
          </Col>
          <Col span={isMobile ? 12 : 7}>
            <div className='public-footer__title'>Resources</div>
            <div className='public-footer__description' onClick={() => window.open(getFrontUserUrl() + ROUTERS.FRONT_USER_BLOGS, '_self')}>Blog</div>
            <div className='public-footer__description'>Help center</div>
            <div className='public-footer__description' onClick={() => window.open(getFrontUserUrl() + ROUTERS.FRONT_USER_ALL_PRODUCTS, '_self')}>Product Catalog</div>
            <div className='public-footer__description'>APIs & developer docs</div>
            <div className='public-footer__description'>FAQ</div>
          </Col>
          <Col span={isMobile ? 12 : 6}>
            <div className='public-footer__title'>Integration</div>
            <div className='public-footer__description' onClick={() => handleIntegrate('https://shopnow.us/')}>ShopNow</div>
            <div className='public-footer__description' onClick={() => handleIntegrate('https://www.etsy.com/')}>Etsy</div>
            <div className='public-footer__description' onClick={() => handleIntegrate('https://woocommerce.com/')}>WooCommerce</div>
            <div className='public-footer__description' onClick={() => handleIntegrate('https://www.shopify.com/')}>Shopify</div>
            <div className='public-footer__description' onClick={() => handleIntegrate('https://www.shopbase.com/')}>Shopbase</div>
          </Col>
          <Col span={isMobile ? 12 : 3}>
            <div className='public-footer__title'>Socials</div>
            { socialLinks.map((item, index) => (
              <div className={classNames('public-footer__description', {
                'no-link' : !item.link
              })} onClick={() => item.link && openLink(item.link)}
                key={index}
              >
                {item.label}
              </div>
            ))}
          </Col>
        </Row>
      </div>
      <div className='public-footer__footer'>
        <Divider style={{ background: '#272825'}}/>
        <div className='public-footer__bottom-footer'>
          <div className='public-footer__logo'>
            <a href='/'>
              <Icon src={logo} alt={WEBSITE_NAME} height={24}/>
            </a>
          </div>
          <div className='public-footer__copy-right'>
            <span>{`©${new Date().getFullYear()} MonsPrints. All rights reserved.`}</span>
          </div>
          <div className={'public-footer__go-to-top cursor-pointer'} onClick={goToTop}>
            <ArrowUpOutlined style={{ fontSize: 22, color: 'white'}}/>
          </div>
        </div>
      </div>
      {
        !!pageID && <MessengerChat pageId={SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_FACEBOOK_PAGE_ID)} />
      }
    </div>
  );
}
