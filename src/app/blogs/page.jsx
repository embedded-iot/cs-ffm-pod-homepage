import React from "react";
import FrontUserBlogsPage from "containers/BlogsPage";
import { WEBSITE_NAME } from "components/contants";

export const metadata = {
  title: `Blog list - ${WEBSITE_NAME}`,
};

const BlogsPage = (props) => {
  return <FrontUserBlogsPage />;
};

export default BlogsPage;
