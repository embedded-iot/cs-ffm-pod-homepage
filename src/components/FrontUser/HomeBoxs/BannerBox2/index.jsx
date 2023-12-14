import React from 'react';
import giayImg from 'public/images/home/giay.png';
import cocImg from 'public/images/home/coc.png';
import aoImg from 'public/images/home/ao.png';
import capImg from 'public/images/home/cap.png';
import arrowIcon from 'public/images/home/arrow_right_long_light.svg';
import { Col, Row } from 'antd';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import './style.scss';
import Icon from "../../../Common/Icon";

export default function BannerBox2({ customClass, redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className={`banner-box-2__wrapper ${customClass} ${isMobile && 'banner-box-2__wrapper--mobile'}`}>
      <Row>
        <Col span={isMobile ? 24 : 8} className={`banner-box-2__left-box ${isMobile && 'padding-box--mobile'}`}>
          <div className='banner-box-2__contents'>
            <div className='banner-box-2__title'>
              QUALITY MADE EASY
            </div>
            <div className='banner-box-2__description'>
              Choose from hundreds of retail-quality products you can design and start selling right away. We'll handle the headache of end-to-end logistics so that you can focus on the fun stuff.
            </div>
            <div className='banner-box-2__buttons'>
              <span className='banner-box-2__buttons' onClick={() => redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS)}>All products</span>
              <Icon src={arrowIcon} alt="All products link" width={24} height={24}/>
            </div>
          </div>
        </Col>
        <Col span={isMobile ? 24 : 16} className="banner-box-2__img-box">
          <div className='banner-box-2__img-box'>
            <div className='banner-box-2__img'>
              <div className='banner-box-2__ao-img'>
                <Icon src={aoImg} alt="banner img"/>
              </div>
              <div className='banner-box-2__cap-img'>
                <Icon src={capImg} alt="banner img"/>
              </div>
              <div className='banner-box-2__coc-img'>
                <Icon src={cocImg} alt="banner img"/>
              </div>
              <div className='banner-box-2__giay-img'>
                <Icon src={giayImg} alt="banner img"/>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
