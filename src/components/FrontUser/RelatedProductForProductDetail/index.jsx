import React, { useState } from 'react';
import RelatedProductsBox from 'components/FrontUser/RelatedProductsBox';
import './style.scss';

export default function RelatedProductForProductDetail({ categoryId, productId, redirectTo }) {
  const [totalCount, setTotalCount] = useState(0);
  return (
    <div className={`related-product-for-product-detail__wrapper`} style={{ display: totalCount ? 'block' : 'none' }}>
      <div className='related-product-for-product-detail__title'>
        You may also like
      </div>
      <div className='product-detail-box__description'>
        <RelatedProductsBox
          categoryId={+categoryId}
          productId={+productId}
          redirectTo={redirectTo}
          successCallback={setTotalCount}
          defaultParams={{
            sortBy: "displayOrder",
            sortDirection: "asc",
          }}
        />
      </div>
    </div>
  );
}
