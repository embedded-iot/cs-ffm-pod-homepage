"use client";

import React from 'react';
import MultiCarouselView from 'components/Common/MultiCarouselView';
import CategoryItem from 'components/FrontUser/CategoriesGrid/CategoryItem';
import {ROUTERS} from 'components/contants';

import './style.scss';

const responsiveProps = {
  desktop: {
    breakpoint: { max: 3000, min: 1366 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  x_tablet: {
    breakpoint: { max: 1366, min: 1124 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1124, min: 768 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  }
};

export default function RelatedProductsBox({ products, redirectTo, deviceType }) {
  const handleClick = product => {
    const { productSlug, productId } = product;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/detail/${productSlug}/${productId}`);
  }

  return (
    <MultiCarouselView
      containerClass={`related-product-carousel__wrapper`}
      itemClass={`related-product-carousel__product-item`}
      deviceType={deviceType}
      responsive={responsiveProps}
    >
      {
        products.map((product) => <CategoryItem key={product.id} item={product} onClick={handleClick} showDes2={false}/>)
      }
    </MultiCarouselView>
  );
}
