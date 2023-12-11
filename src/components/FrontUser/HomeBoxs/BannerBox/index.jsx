import React from 'react';
import bannerImg from 'public/images/home/home-2.png';
import customProductImg from 'public/images/home/home-19.png';
import { Button, Col, Row } from 'antd';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import './style.scss';

export default function BannerBox({ customClass, redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className={`banner-box__wrapper ${customClass} ${isMobile && 'banner-box__wrapper--mobile'}`}>
      <div className='banner-box__contents'>
        <div className='banner-box__title'>
          Create and sell
        </div>
        <div className='banner-box__description'>
          <img src={customProductImg} alt="banner img" />
        </div>
        <div className='banner-box__checkbox-list'>
          <div className='banner-box__checkbox-item'>
            <div className='banner-box__item-icon' />
            <div className='banner-box__item-label'>100% Free to use</div>
          </div>
          <div className='banner-box__checkbox-item'>
            <div className='banner-box__item-icon' />
            <div className='banner-box__item-label'>High-Quality Products</div>
          </div>
          <div className='banner-box__checkbox-item'>
            <div className='banner-box__item-icon' />
            <div className='banner-box__item-label'>Largest global print network</div>
          </div>
        </div>
        <div className='banner-box__item-label'>Trusted by over 8M sellers around the world</div>
        <div className='banner-box__buttons'>
          <Button type="primary" onClick={() => redirectTo(ROUTERS.FRONT_USER_REGISTER)}>Start for free</Button>
        </div>
      </div>
    </div>
  )
}
