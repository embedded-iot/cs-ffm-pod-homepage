import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import { FrontUserStaticBlogsService } from 'services';
import PlainText from 'components/Common/PlainText';
import "./style.scss";

function StaticBlogsPage(props) {
  const { blogKey } = props.match ? props.match.params : {};
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const blog = FrontUserStaticBlogsService.getStaticBlog(blogKey) || {};
  return (
    <div className={`${isMobile ? 'page-wrapper--full-width' : 'page-wrapper'} static-blogs-page__wrapper`}>
      <Helmet>
        <title>{blog.title}</title>
      </Helmet>
      <div className="page-contents">
        <PageHeader
          title={blog.title}
        />
        <PlainText type="TextArea">
          { blog.content }
        </PlainText>
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
)(StaticBlogsPage);
