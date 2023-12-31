import React from 'react';
import bannerImg from 'public/images/home/home-16.png';
import { Col, Row } from 'antd';
import './style.scss';
import Icon from "../../../Common/Icon";

export default function BannerBox9({ isMobile, customClass, redirectTo }) {
  return (
    <div className={`banner-box-9__wrapper ${customClass} banner-box-9__wrapper ${isMobile && 'banner-box-9__wrapper--mobile'}`}>
      <Row>
        <Col span={isMobile ? 24 : 12} className={`banner-box-9__left-box ${isMobile && 'padding-box--mobile'}`}>
          <div className='banner-box-9__contents'>
            <div className='banner-box-9__title'>
              Premium Branding Options
            </div>
            <div className='banner-box-9__description'>
              MonsPrints helps you create a unique brand image and turns your site visitors into loyal customers
            </div>
            <div className='banner-box-9__checkbox-list'>
              <div className='banner-box-9__checkbox-item'>
                <div className='banner-box-9__item-icon' />
                <div className='banner-box-9__item-label'>Hang tags</div>
              </div>
              <div className='banner-box-9__checkbox-item'>
                <div className='banner-box-9__item-icon' />
                <div className='banner-box-9__item-label'>Labels</div>
              </div>
              <div className='banner-box-9__checkbox-item'>
                <div className='banner-box-9__item-icon' />
                <div className='banner-box-9__item-label'>Garment print</div>
              </div>
              <div className='banner-box-9__checkbox-item'>
                <div className='banner-box-9__item-icon' />
                <div className='banner-box-9__item-label'>Folding & Inserting</div>
              </div>
              <div className='banner-box-9__checkbox-item'>
                <div className='banner-box-9__item-icon' />
                <div className='banner-box-9__item-label'>Unique packaging</div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={isMobile ? 24 : 12} className="banner-box-9__img-box">
          <div className='banner-box-9__img'>
            <Icon src={bannerImg} alt="banner img" />
          </div>
        </Col>
      </Row>
      {/*<div className="banner-box-9__wrapper-1">*/}
      {/*  <Row gutter={[64, 64]}>*/}
      {/*    <Col span={isMobile ? 24 : 12} className={`banner-box-9__left-box ${isMobile && 'padding-box--mobile'}`}>*/}
      {/*      <div className='banner-box-9__contents-1'>*/}
      {/*        <div className='banner-box-9__title'>*/}
      {/*          How can we help?*/}
      {/*        </div>*/}
      {/*        <div className='banner-box-9__description'>*/}
      {/*          In addition to the quality of prints, we also provide unparalleled services. Our team of experienced industry professionals works tirelessly to manage your products. We take pride in what we do and can fulfill your on-demand needs.*/}
      {/*        </div>*/}
      {/*        <div className='banner-box-9__buttons'>*/}
      {/*          <Button type="primary" onClick={() => redirectTo(ROUTERS.FRONT_USER_REGISTER)}>Start for free</Button>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </Col>*/}
      {/*    <Col span={isMobile ? 24 : 12} className="banner-box-9__img-box">*/}
      {/*      <div className='banner-box-9__img-1'>*/}
      {/*        <Icon src={bannerImg1} alt="banner img" />*/}
      {/*      </div>*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/*</div>*/}
    </div>
  )
}
