import React from 'react';
import image1 from 'public/images/home/user_box_fill.svg';
import image2 from 'public/images/home/bag_alt_fill.svg';
import image3 from 'public/images/home/d3_box_fill.svg';
import image4 from 'public/images/home/box_alt_fill.svg';
import { Button, Col, Row } from 'antd';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

import './style.scss';
import Icon from 'components/Common/Icon';

export default function BannerBox3({ customClass, redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className={`banner-box-7__wrapper`}>
      <div className='banner-box-7__contents'>
        <div className='banner-box-7__title'>
          Print on Demand Fulfillment Service
        </div>
        <div className='banner-box-7__description'>
          We’re the experts in print-on-demand solutions, trusted to deliver by merchants worldwide!
        </div>
      </div>
      <Row gutter={isMobile ? [16, 16] : [32, 32]} className='banner-box-7__list'>
        <Col span={isMobile ? 12 : 6}>
          <div className='banner-box-7__content'>
            <div className='banner-box-7__item-header'>
              <Icon src={image1} alt={"icon"} width={64} height={64} />
            </div>
            <div className='banner-box-7__item-title'>Create account</div>
            <div className='banner-box-7__item-description'>You can start your fulfillment with MonsPrints by creating a fulfilment store.</div>
          </div>
        </Col>
        <Col span={isMobile ? 12 : 6}>
          <div className='banner-box-7__content'>
            <div className='banner-box-7__item-header'>
              <Icon src={image2} alt={"icon"} width={64} height={64} />
            </div>
            <div className='banner-box-7__item-title'>Make sales and process orders</div>
            <div className='banner-box-7__item-description'>Customers make orders. MonsPrints puts orders into production and charges for fulfillment. You take the profit.</div>
          </div>
        </Col>
        <Col span={isMobile ? 12 : 6}>
          <div className='banner-box-7__content'>
            <div className='banner-box-7__item-header'>
              <Icon src={image3} alt={"icon"} width={64} height={64} />
            </div>
            <div className='banner-box-7__item-title'>Product Fulfilled</div>
            <div className='banner-box-7__item-description'>We ship to anywhere in the world. Our packaging service allows you to personalise brand dispatch.</div>
          </div>
        </Col>
        <Col span={isMobile ? 12 : 6}>
          <div className='banner-box-7__content'>
            <div className='banner-box-7__item-header'>
              <Icon src={image4} alt={"icon"} width={64} height={64} />
            </div>
            <div className='banner-box-7__item-title'>Packed and Shipped</div>
            <div className='banner-box-7__item-description'>We ship to anywhere in the world. Our packaging service allows you to personalise brand dispatch.</div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
