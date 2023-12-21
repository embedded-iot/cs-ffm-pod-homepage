import React from "react";
import FrontUserProductDetailPage from "containers/ProductDetailPage";
import {
  FrontUserCategoriesService,
} from "services";
import { WEBSITE_NAME } from "components/contants";
import useMedia from "hooks/useMedia";


export async function generateMetadata({ params, searchParams }) {
  const { productId } = params;
  const product = await new Promise((resolve, reject) =>
    FrontUserCategoriesService.getProductDetail(productId, resolve, reject),
  );
  return {
    title: `${product?.productName} - ${WEBSITE_NAME}`,
  };
}

const ProductDetail = async ({ params }) => {
  const { deviceType } = useMedia();
  const { productId } = params;
  const product = await new Promise((resolve, reject) =>
    FrontUserCategoriesService.getProductDetail(productId, resolve, reject),
  );
  const categoryId = product?.productsCategories?.[product?.productsCategories?.length - 1]?.categoryId;
  const relatedProducts = await new Promise((resolve, reject) => {
    FrontUserCategoriesService.getCategories({
      categoryId,
      pageSize: 100,
      pageNum: 1,
      sortBy: "displayOrder",
      sortDirection: "asc",
    }, response => {
      const items = response?.items?.filter(item => item.id !== productId) || [];
      resolve(items);
    }, reject)
  });


  return (
    <FrontUserProductDetailPage
      product={product}
      categoryId={categoryId}
      relatedProducts={relatedProducts || []}
      deviceType={deviceType}
    />
  )
};

export default ProductDetail;
