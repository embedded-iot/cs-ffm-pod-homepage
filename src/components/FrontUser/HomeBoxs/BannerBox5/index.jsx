import React from 'react';
import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';

import './style.scss';

import arrowIcon from 'public/images/home/arrow_right_long_light.svg';
import bannerImg from 'public/images/home/home-20.png';
import bannerImg1 from 'public/images/home/home-14.png';
import Icon from "../../../Common/Icon";


export default function BannerBox5({ customClass, redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);

  return (
    <div className={`banner-box-5__wrapper`}>
      <div className='banner-box-5__contents'>
        <div className='banner-box-5__title'>
          Are you a large business looking <br/>for custom solutions?
        </div>
        <div className='banner-box-5__description'>
          <span className='banner-box-5__link'>Talk to sales</span>
          <Icon src={arrowIcon} alt="All products link" width={24} height={24}/>
        </div>
      </div>
      <Row>
        <Col span={isMobile ? 24 : 16} className="banner-box-5__img-box">
          <div className='banner-box-5__img'>
            <Icon src={bannerImg} alt="banner img" />
          </div>
        </Col>
        <Col span={isMobile ? 24 : 8} className={`banner-box-5__right-box ${isMobile && 'padding-box--mobile'}`}>
          <div className='banner-box-5__contents-1'>
            <div className='banner-box-5__title-1'>
              Easily add your design to a wide range of products
            </div>
            <div className='banner-box-5__description-1'>
              With our free design tools, you can easily add your custom designs to t-shirts, mugs, phone cases, and hundreds of other products.
            </div>
            <div className='banner-box-5__buttons'>
              <Icon src={bannerImg1} alt="All products link"/>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
