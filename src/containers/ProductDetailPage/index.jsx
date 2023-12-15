"use client";

import React, { useMemo, useState } from "react";
import BreadcrumbBox from "components/Common/BreadcrumbBox";
import { RESPONSIVE_MEDIAS, ROUTERS } from "components/contants";
import ProductDetailBox from "components/FrontUser/ProductDetailBox";
import RelatedProductForProductDetail from "components/FrontUser/RelatedProductForProductDetail";
import { useMediaQuery } from "react-responsive";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "store/hooks";

import "./style.scss";

function ProductDetailPage(props) {
  const { productId } = useParams();
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [product, setProduct] = useState(null);
  const systemConfigs = useAppSelector((state) => state.data.systemConfigs);
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

  const selectedCategory = useMemo(() => {
    const categories = product?.productsCategories || [];
    return categories.length ? categories[categories.length - 1] : null;
  }, [product]);

  return (
    <div
      className={`${
        isMobile ? "page-wrapper--full-width" : "page-wrapper"
      } product-detail-page__wrapper`}
    >
      <div className="page-contents">
        <BreadcrumbBox
          className={"product-detail-page__breadcrumb"}
          routes={breadcrumbRoutes}
        />
        <ProductDetailBox
          productId={productId}
          redirectTo={router.push}
          successCallback={setProduct}
          systemConfigs={systemConfigs}
        />
        {!!selectedCategory && (
          <RelatedProductForProductDetail
            categoryId={selectedCategory.categoryId}
            productId={productId}
            redirectTo={router.push}
          />
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
