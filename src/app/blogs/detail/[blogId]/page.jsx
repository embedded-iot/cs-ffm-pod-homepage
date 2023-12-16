import React from "react";
import FrontUserBlogDetailPage from "containers/BlogDetailPage";
import {
  FrontUserPostsService,
} from "services";
import { WEBSITE_NAME } from "components/contants";

export async function generateMetadata({ params, searchParams }) {
  const { blogId } = params;
  const blog = await new Promise((resolve, reject) =>
    FrontUserPostsService.getBlog(blogId, resolve, reject),
  );
  return {
    title: `${blog?.title} - ${WEBSITE_NAME}`,
  };
}

const ProductDetail = (props) => {
  return <FrontUserBlogDetailPage />;
};

export default ProductDetail;
