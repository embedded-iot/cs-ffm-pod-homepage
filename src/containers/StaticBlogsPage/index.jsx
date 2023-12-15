"use client";

import React from "react";
import PageHeader from "components/Share/PageHeader";
import { useMediaQuery } from "react-responsive";
import { RESPONSIVE_MEDIAS } from "components/contants";
import { FrontUserStaticBlogsService } from "services";
import PlainText from "components/Common/PlainText";
import { useParams } from "next/navigation";
import "./style.scss";

function StaticBlogsPage() {
  const { blogKey } = useParams();
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const blog = FrontUserStaticBlogsService.getStaticBlog(blogKey) || {};
  return (
    <div
      className={`${
        isMobile ? "page-wrapper--full-width" : "page-wrapper"
      } static-blogs-page__wrapper`}
    >
      <div className="page-contents">
        <PageHeader title={blog.title} />
        <PlainText type="TextArea">{blog.content}</PlainText>
      </div>
    </div>
  );
}

export default StaticBlogsPage;
