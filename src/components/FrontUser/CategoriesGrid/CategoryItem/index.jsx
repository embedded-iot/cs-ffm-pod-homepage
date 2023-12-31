"use client";

import React from 'react';
import { Card } from 'antd';

import './style.scss';
import Icon from "components/Common/Icon";

export default function CategoryItem({ className, footer, allowClick = true, showTitle = true, showDes1 = true, showDes2 = true, onClick = () => {}, imgProps = {}, item}) {
  const { name, avatar, discountPercent, convertedPrice, convertedOriginPrice, sku } = item || {};
  return (
    <Card
      className={`category-item__wrapper ${className}`}
      cover={<Icon alt={name} src={avatar} {...imgProps} width={100} height={100} />}
      onClick={() => allowClick && onClick(item)}
    >
      { showTitle && <div className='category-item__title'>{name}</div>}
      { showDes1 && <div className='category-item__description-1'>
        From: {convertedPrice}
        {
          !!discountPercent && (
            <>
              <span className="origin-price__text">{convertedOriginPrice}</span>
              <span className="discount__text">Save {discountPercent}%</span>
            </>
          )
        }
      </div>}
      { showDes2 && <div className='category-item__description-2'>{ !!sku && <div><b>SKU:</b> {sku}</div>}</div>}
      { footer && <div className='category-item__footer'>{footer}</div>}
    </Card>

  )
}
