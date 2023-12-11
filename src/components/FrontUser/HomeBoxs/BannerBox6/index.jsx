import React from 'react';
import { Col, Row } from 'antd';
import PostsGrid from 'components/FrontUser/PostsGrid';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

import './style.scss';
import arrowIcon from 'public/images/home/arrow_right_long_light.svg';

export default function BannerBox6({ customClass, redirectTo }) {
  return (
    <div className={`banner-box-6__wrapper ${customClass} banner-box-6__wrapper`}>
      <div className='banner-box-6__contents'>
        <div className='banner-box-6__title'>
          Customer reviews
        </div>
        <div className='banner-box-6__description'>
          We’re the experts in on demand solutions trusted to deliver by merchants worldwide!
        </div>
      </div>
      <PostsGrid className="banner-box-6__blog-list" />
    </div>
  )
}
