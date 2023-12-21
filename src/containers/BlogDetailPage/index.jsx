"use client"

import React, { useMemo } from 'react';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import BlogDetailBox from 'components/FrontUser/BlogDetailBox';
import { useMediaQuery } from 'react-responsive';
import BreadcrumbBox from 'components/Common/BreadcrumbBox';
import {useParams, useRouter} from "next/navigation";
import "./style.scss";


function BlogDetailPage({ blog }) {
  const router = useRouter();
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const breadcrumbRoutes = useMemo(() => {
    const items = [
      {
        path: ROUTERS.FRONT_USER_BLOGS,
        breadcrumbName: 'All blogs',
      },
    ];
    if (blog ) {
      const { blogCategoryName, blogCategoryId, blogCategorySlug } = blog;
      items.push({
        path: ROUTERS.FRONT_USER_BLOGS + '/category/' + blogCategoryId + '/' + blogCategorySlug,
        breadcrumbName: blogCategoryName,
      })
    }
    return items;
  }, [blog])
  return (
    <div className={`${isMobile ? 'page-wrapper--full-width' : 'page-wrapper'} blog-detail-page__wrapper`}>
      <div className="page-contents">
        <BreadcrumbBox className={isMobile && 'blog-detail-page__breadcrumb'}
                       routes={breadcrumbRoutes}
        />
        <BlogDetailBox
          blog={blog}
          redirectTo={router.push}
        />
      </div>
    </div>
  );
}

export default BlogDetailPage;
