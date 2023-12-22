import React from 'react';
import customProductImg from 'public/images/home/home-19.png';
import { Button} from 'antd';
import { ROUTERS } from 'components/contants';
import Icon from "../../../Common/Icon";
import './style.scss';

export default function BannerBox({ isMobile, customClass, redirectTo }) {
  return (
    <div className={`banner-box__wrapper ${customClass} ${isMobile && 'banner-box__wrapper--mobile'}`}>
      <div className='banner-box__contents'>
        <div className='banner-box__title'>
          Create and sell
        </div>
        <div className='banner-box__description'>
          <Icon src={customProductImg} alt="banner img" />
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
