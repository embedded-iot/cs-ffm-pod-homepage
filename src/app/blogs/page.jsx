import React from "react";
import FrontUserBlogsPage from "containers/BlogsPage";
import { WEBSITE_NAME } from "components/contants";
import {FrontUserPostsService} from "../../services";
import {cui} from "../../utils";

export const metadata = {
  title: `Blog list - ${WEBSITE_NAME}`,
};

const BlogsPage = async ({ params }) => {
  const blogsResponse = await new Promise((resolve, reject) =>
    FrontUserPostsService.getBlogs(cui.removeEmpty({
      sortBy: "displayOrder",
      sortDirection: "asc",
      blogCategoryId: params?.blogCategoryId || -1
    }), resolve, reject)
  );
  const blogsCategoriesResponse = await new Promise((resolve, reject) =>
    FrontUserPostsService.getBlogsCategories(
      { pageSize: 1000, pageNum: 1}, resolve, reject)
  );

  return (
    <FrontUserBlogsPage
      blogsResponse={blogsResponse}
      blogsCategoriesResponse={blogsCategoriesResponse}
    />
  );
};

export default BlogsPage;
