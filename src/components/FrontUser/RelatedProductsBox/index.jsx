import React, { useEffect, useRef, useState } from 'react';
import MultiCarouselView from 'components/Common/MultiCarouselView';
import { FrontUserCategoriesService } from 'services';
import CategoryItem from 'components/FrontUser/CategoriesGrid/CategoryItem';
import { ROUTERS } from 'components/contants';

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

export default function RelatedProductsBox({ categoryId, productId, defaultParams = {}, redirectTo, containerClass, itemClass, responsive, successCallback, ...restProps }) {
  const [products, setProducts] = useState([]);
  const ref = useRef({
    pageNum: 1,
    totalPage: 1000,
    visitedProductsCount: 4,
  });
  const getProductsByCategoryId = () => {
    if (ref.current.pageNum > ref.current.totalPage) {
      return;
    }
    FrontUserCategoriesService.getCategories({ categoryId, pageSize: 8, pageNum: ref.current.pageNum, ...defaultParams }, response => {
      const items = response?.items?.filter(item => item.id !== productId) || [];
      setProducts(prevProducts => [
        ...prevProducts,
        ...items
      ]);
      ref.current.pageNum = ref.current.pageNum + 1;
      ref.current.totalPage = response?.totalPage;
      ref.current.totalCount = response?.totalCount;
      successCallback(response?.totalCount);
    })
  }

  const handleNextSlide = () => {
    if (ref.current.visitedProductsCount === (products.length - 2)) {
      getProductsByCategoryId();
    }
    ref.current.visitedProductsCount += 1;
  }

  useEffect(() => {
    getProductsByCategoryId();
    // eslint-disable-next-line
  }, [productId]);

  const handleClick = product => {
    const { productSlug, productId } = product;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/detail/${productSlug}/${productId}`);
  }

  return (
    <MultiCarouselView
      {...restProps}
      containerClass={`related-product-carousel__wrapper ${containerClass}`}
      itemClass={`related-product-carousel__product-item ${itemClass}`}
      deviceType="desktop"
      responsive={responsiveProps}
      onNextClick={handleNextSlide}
    >
      {
        products.map((product) => <CategoryItem {...product} onClick={handleClick} showDes2={false}/>)
      }
    </MultiCarouselView>
  );
}
