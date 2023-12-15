"use client";

import React from "react";
import ImageGalleryView from "components/Common/ImageGalleryView";
import "./style.scss";

export default function ProductImagesPreview({ product = {} }) {
  return (
    <div className="product-image-preview__wrapper">
      <ImageGalleryView images={product.images} />
    </div>
  );
}
