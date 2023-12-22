"use client"

import React from 'react';
import BlogsGrid from 'components/FrontUser/BlogsGrid';
import {useParams, useRouter} from "next/navigation";
import "./style.scss";


function BlogsPage({ blogsResponse, blogsCategoriesResponse }) {
  const { blogCategoryId } = useParams();
  const router = useRouter();
  return (
    <div className={`page-wrapper blogs-page__wrapper`}>
      <div className="page-contents">
        <BlogsGrid
          blogsResponse={blogsResponse}
          blogsCategoriesResponse={blogsCategoriesResponse}
          blogCategoryId={blogCategoryId ? +blogCategoryId : ''}
          redirectTo={router.push}
        />
      </div>
    </div>
  );
}

export default BlogsPage;
