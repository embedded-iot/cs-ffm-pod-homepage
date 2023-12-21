import React from 'react';
import RelatedProductsBox from 'components/FrontUser/RelatedProductsBox';
import './style.scss';

export default function RelatedProductForProductDetail({ products, redirectTo, deviceType }) {
  return (
    <div className={`related-product-for-product-detail__wrapper`} style={{ display: products?.length ? 'block' : 'none' }}>
      <div className='related-product-for-product-detail__title'>
        You may also like
      </div>
      <div className='product-detail-box__description'>
        <RelatedProductsBox
          products={products}
          deviceType={deviceType}
          redirectTo={redirectTo}
        />
      </div>
    </div>
  );
}
