"use client"

import React from 'react';
import BlogsGrid from 'components/FrontUser/BlogsGrid';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import {useParams, useRouter} from "next/navigation";
import "./style.scss";


function BlogsPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const { blogCategoryId } = useParams();
  const router = useRouter();
  return (
    <div className={`${isMobile ? 'page-wrapper--full-width' : 'page-wrapper'} blogs-page__wrapper`}>
      <div className="page-contents">
        <BlogsGrid
          blogCategoryId={blogCategoryId ? +blogCategoryId : ''}
          redirectTo={router.push}
        />
      </div>
    </div>
  );
}

export default BlogsPage;
