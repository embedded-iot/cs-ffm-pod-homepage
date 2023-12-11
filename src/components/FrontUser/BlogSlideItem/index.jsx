import React from 'react';
import { Col, Row } from 'antd';

import './style.scss';

export default function BlogSlideItem({ data = {}, onClick = () => {}, className = '', hasWrap = true, imageHeight = 'autp'  }) {
  const { image, headerTitle, title, description } = data;
  return (
    <Row gutter={hasWrap ? [0, 0] : [64, 0] } className={`blog-slide-item__wrapper ${className}`} onClick={() => onClick(data)}>
      <Col span={hasWrap ? 24 : 14 } className='blog-slide-item__image'>
        <img src={image} alt={title} style={{ height: imageHeight}} />
      </Col>
      <Col span={hasWrap ? 24 : 10 } className={hasWrap ? 'blog-slide-item__wrap-contents' : 'blog-slide-item__no-wrap-contents'}>
        { hasWrap ? (
          <div>
            <div className='blog-slide-item__wrap-title'>{title}</div>
            <div className='blog-slide-item__wrap-header-title'>{headerTitle}</div>
          </div>
        ): (
          <div>
            <div className='blog-slide-item__no-wrap-title'>{title}</div>
            <div className='blog-slide-item__no-wrap-description'>{description}</div>
            <div className='blog-slide-item__no-wrap-header-title'>{headerTitle}</div>
          </div>
        )}
      </Col>
    </Row>
  )
}
