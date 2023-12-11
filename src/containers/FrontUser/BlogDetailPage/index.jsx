import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import BlogDetailBox from 'components/FrontUser/BlogDetailBox';
import { useMediaQuery } from 'react-responsive';
import BreadcrumbBox from 'components/Common/BreadcrumbBox';
import "./style.scss";


function BlogDetailPage(props) {
  const { blogId } = props.match ? props.match.params : {};
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [blog, setBlog] = useState(null);
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
      <Helmet>
        <title>Blog details</title>
      </Helmet>
      <div className="page-contents">
        <BreadcrumbBox className={isMobile && 'blog-detail-page__breadcrumb'}
                       routes={breadcrumbRoutes}
        />
        <BlogDetailBox
          blogId={blogId}
          redirectTo={props.push}
          onSuccessCallback={setBlog}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(BlogDetailPage);
