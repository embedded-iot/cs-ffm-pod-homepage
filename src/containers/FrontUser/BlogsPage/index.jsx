import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import BlogsGrid from 'components/FrontUser/BlogsGrid';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import "./style.scss";

function BlogsPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const { blogCategoryId } = props.match ? props.match.params : {};
  return (
    <div className={`${isMobile ? 'page-wrapper--full-width' : 'page-wrapper'} blogs-page__wrapper`}>
      <Helmet>
        <title>Blog List</title>
      </Helmet>
      <div className="page-contents">
        <BlogsGrid
          blogCategoryId={blogCategoryId ? +blogCategoryId : ''}
          redirectTo={props.push}
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
)(BlogsPage);
