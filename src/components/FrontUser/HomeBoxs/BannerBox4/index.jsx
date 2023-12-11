import React from 'react';
import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

import './style.scss';
import image8 from 'public/images/home/home-9.png';
import image9 from 'public/images/home/etsy_logo.png';
import image10 from 'public/images/home/home-8.png';
import image11 from 'public/images/home/home-11.png';
import image12 from 'public/images/home/home-12.png';
import image13 from 'public/images/home/home-10.png';

const images = [image8, image9, image10, image11, image12, image13]

export default function BannerBox4({ customClass, redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);

  return (
    <div className={`banner-box-4__wrapper`}>
      <div className='banner-box-4__contents'>
        <div className='banner-box-4__title'>
          Connect your store
        </div>
        <div className='banner-box-4__description'>
          MonsPrints easily integrates with major e-commerce platforms and marketplaces
        </div>
      </div>
      <Row gutter={isMobile ? [16, 16] : [24, 24]} className='banner-box-4__brand-list'>
        {
          images.map((img, index) => (
            <Col span={isMobile ? 12 :4}>
              <div className='banner-box-4__content' key={index}>
                <img src={img} alt="img" />
              </div>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}
