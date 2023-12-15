import React from "react";
import FrontUserProductDetailPage from "containers/ProductDetailPage";
import {
  FrontUserCategoriesService,
  FrontUserStaticBlogsService,
} from "services";
import { WEBSITE_NAME } from "components/contants";

export async function generateMetadata({ params, searchParams }) {
  const { productId } = params;
  const product = await new Promise((resolve, reject) =>
    FrontUserCategoriesService.getProductDetail(productId, resolve, reject),
  );
  return {
    title: `${product?.productName} - ${WEBSITE_NAME}`,
  };
}

const ProductDetail = (props) => {
  return <FrontUserProductDetailPage />;
};

export default ProductDetail;
