import React from 'react';
import expandUpIcon from 'public/images/home/done_ring_round_fill.svg';
import {  Col, Row } from 'antd';

import './style.scss';
import Icon from 'components/Common/Icon';

export default function BannerBox3({isMobile, customClass, redirectTo }) {
  return (
    <div className={`banner-box-3__wrapper`}>
      <Row gutter={[32, 32]}>
        <Col span={isMobile ? 24 : 8}>
          <div className='banner-box-3__content'>
            <div className='banner-box-3__item-header'>
              <Icon src={expandUpIcon} alt={"icon"} width={24} height={24} />
              <span>CREATE</span>
            </div>
            <div className='banner-box-3__item-title'>products</div>
            <div className='banner-box-3__item-description'>Easily add your designs to a wide range of products</div>
          </div>
        </Col>
        <Col span={isMobile ? 24 : 8}>
          <div className='banner-box-3__content'>
            <div className='banner-box-3__item-header'>
              <Icon src={expandUpIcon} alt={"icon"} width={24} height={24} />
              <span>SELL</span>
            </div>
            <div className='banner-box-3__item-title'>on your terms</div>
            <div className='banner-box-3__item-description'>You choose the products, sale price, and where to sell</div>
          </div>
        </Col>
        <Col span={isMobile ? 24 : 8}>
          <div className='banner-box-3__content'>
            <div className='banner-box-3__item-header'>
              <Icon src={expandUpIcon} alt={"icon"} width={24} height={24} />
              <span>WE HANDLE</span>
            </div>
            <div className='banner-box-3__item-title'>fulfillment</div>
            <div className='banner-box-3__item-description'>Once an order is placed, we automatically handle all the printing and delivery logistics</div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
