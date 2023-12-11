import React from 'react';
import ImageGalleryView from 'components/Common/ImageGalleryView';
import './style.scss';
import ImageView from 'components/Common/ImageView';

export default function ProductImagesPreview({ product = {}}) {
  return (
    <div className="product-image-preview__wrapper">
      <ImageGalleryView
        images={product.images}
      />
    </div>
  )
}
