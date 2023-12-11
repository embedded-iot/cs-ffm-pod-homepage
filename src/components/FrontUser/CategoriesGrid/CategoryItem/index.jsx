import React from 'react';
import { Card } from 'antd';

import './style.scss';

export default function CategoryItem({ className, footer, allowClick = true, showTitle = true, showDes1 = true, showDes2 = true, onClick = () => {}, imgProps = {}, ...restProp}) {
  const { id, name, avatar, discountPercent, convertedPrice, convertedOriginPrice, sku } = restProp || {};
  return (
    <Card
      className={`category-item__wrapper ${className}`}
      cover={<img alt={name} src={avatar} {...imgProps} />}
      onClick={() => allowClick && onClick(restProp)}
      key={id}
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
