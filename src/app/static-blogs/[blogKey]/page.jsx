import React from "react";
import FrontUserStaticBlogsPage from "containers/StaticBlogsPage";
import { FrontUserStaticBlogsService } from "services";
import { WEBSITE_NAME } from "components/contants";

export async function generateMetadata({ params, searchParams }) {
  const { blogKey } = params;
  const blog = await FrontUserStaticBlogsService.getStaticBlog(blogKey);
  return {
    title: `${blog?.title} - ${WEBSITE_NAME}`,
  };
}

const StaticBlog = (props) => {
  return <FrontUserStaticBlogsPage />;
};

export default StaticBlog;
