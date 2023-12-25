import React from 'react';
import bannerImg1 from 'public/images/home/home-3.png';
import bannerImg2 from 'public/images/home/home-4.png';
import bannerImg3 from 'public/images/home/home-5.png';
import expandUpIcon from 'public/images/home/expand_up.svg';
import { Button, Col, Row } from 'antd';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

import './style.scss';
import Icon from 'components/Common/Icon';

export default function BannerBox1({ isMobile, customClass, redirectTo }) {
  return (
    <div className={`banner-box-1__wrapper`}>
      <Row gutter={isMobile ? [16, 16] : [24, 24]}>
        <Col span={isMobile ? 24 : 8}>
          <div className="banner-box-1__item-card">
            <div className='banner-box-1__content'>
              <div className='banner-box-1__item-title'>
                <Icon src={expandUpIcon} alt={"icon"} width={24} height={24} />
                <span>Product quality</span>
              </div>
              <div className='banner-box-1__item-description'>Our commitment to superior craftsmanship ensures that each product reflects precision, vibrancy, and durability.</div>
            </div>
            <div className='banner-box-1__img'>
              <Icon src={bannerImg1} alt="banner img" />
            </div>
          </div>
        </Col>
        <Col span={isMobile ? 24 : 8}>
          <div className="banner-box-1__item-card">
            <div className='banner-box-1__content'>
              <div className='banner-box-1__item-title'>
                <Icon src={expandUpIcon} alt={"icon"} width={24} height={24} />
                <span>Robust Scaling</span>
              </div>
              <div className='banner-box-1__item-description'>Easily handle peak holiday seasons, with our wide network of partners and automatic routing functionality.</div>
            </div>
            <div className='banner-box-1__img'>
              <Icon src={bannerImg2} alt="banner img" />
            </div>
          </div>
        </Col>
        <Col span={isMobile ? 24 : 8}>
          <div className="banner-box-1__item-card">
            <div className='banner-box-1__content'>
              <div className='banner-box-1__item-title'>
                <Icon src={expandUpIcon} alt={"icon"} width={24} height={24} />
                <span>Best Selection</span>
              </div>
              <div className='banner-box-1__item-description'>With 900+ products and top quality brands, you can choose the best products for your business.</div>
            </div>
            <div className='banner-box-1__img'>
              <Icon src={bannerImg3} alt="banner img" />
            </div>
          </div>
        </Col>

      </Row>
    </div>
  )
}
