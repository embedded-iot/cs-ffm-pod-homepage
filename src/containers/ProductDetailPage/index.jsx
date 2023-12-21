"use client";

import React, { useMemo } from "react";
import BreadcrumbBox from "components/Common/BreadcrumbBox";
import { ROUTERS } from "components/contants";
import ProductDetailBox from "components/FrontUser/ProductDetailBox";
import RelatedProductForProductDetail from "components/FrontUser/RelatedProductForProductDetail";
import {useRouter} from "next/navigation";

import "./style.scss";

function ProductDetailPage({ product, relatedProducts, deviceType }) {
  const router = useRouter();
  const breadcrumbRoutes = useMemo(() => {
    const defaultRouters = [
      {
        path: ROUTERS.FRONT_USER_ALL_PRODUCTS,
        breadcrumbName: "All products",
      },
    ];
    const categoryRouters = (product?.productsCategories || []).map((item) => {
      const { category, categoryId } = item;
      const { name: categoryName, slug: categorySlug } = category;
      return {
        path: `${ROUTERS.FRONT_USER_ALL_PRODUCTS}/category/${categorySlug}/${categoryId}`,
        breadcrumbName: categoryName,
      };
    });
    return [...defaultRouters, ...categoryRouters];
  }, [product]);

  return (
    <div
      className={`page-wrapper product-detail-page__wrapper`}
    >
      <div className="page-contents">
        <BreadcrumbBox
          className={"product-detail-page__breadcrumb"}
          routes={breadcrumbRoutes}
        />
        <ProductDetailBox
          product={product}
        />
        <RelatedProductForProductDetail
          products={relatedProducts}
          deviceType={deviceType}
          redirectTo={router.push}
        />
      </div>
    </div>
  );
}

export default ProductDetailPage;
