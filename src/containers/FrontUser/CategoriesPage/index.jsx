import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { push, replace } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CategoriesGrid from 'components/FrontUser/CategoriesGrid';
import { useMediaQuery } from 'react-responsive';
import {RESPONSIVE_MEDIAS, ROUTERS} from 'components/contants';

import './style.scss';
import PublicPageHeader from "components/Share/PublicPageHeader";
import SortByDropdownMenu from 'components/FrontUser/CategoriesGrid/SortByDropdownMenu';
import queryString from 'query-string';
import { events } from 'utils';


const RELOAD_EVENT_KEY = 'RELOAD_PRODUCTS_TABLE_EVENT_KEY';
const CLEAR_EVENT_KEY = 'CLEAR_PRODUCTS_TABLE_EVENT_KEY';


function CategoriesPage(props) {
  const params = props.match ? props.match.params : {};
  const queryParams = queryString.parse(props.location.search);
  const { categoryId, collectionId } = params;
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [totalCount, setTotalCount] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [filterBreadcrumbs, setFilterBreadcrumbs] = useState([]);
  const title = `Design & Sell ${filterName || 'Products'} ${isMobile ? '' : `(${totalCount})`}`;
  const breadcrumbRouters = useMemo(() => {
    return [
      {
        path: ROUTERS.FRONT_USER_ALL_PRODUCTS,
        breadcrumbName: 'All products',
      },
      ...filterBreadcrumbs
    ];
  }, [filterBreadcrumbs]);

  const handleSortBy = (sortByValue) => {
    events.publish(RELOAD_EVENT_KEY, {
      sortByValue
    });
  }

  return (
    <div className={`${isMobile ? 'page-wrapper--full-width' : 'page-wrapper'} categories-page__wrapper`}>
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <PublicPageHeader
        className={'categories-page__header'}
        title={(
          <div className={'categories-page__title'} >
            <span>{title}</span>
            {
              !isMobile && (
                <SortByDropdownMenu
                  value={queryParams?.sortByValue}
                  onSortByChange={handleSortBy}
                />
              )
            }
          </div>
        )}
        breadcrumbRouters={breadcrumbRouters}
      />
      <div className="page-contents">
        <CategoriesGrid
          CLEAR_EVENT_KEY={CLEAR_EVENT_KEY}
          RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
          categoryId={categoryId ? +categoryId : ''}
          collectionId={collectionId ? +collectionId : ''}
          queryParams={queryParams}
          redirectTo={props.push}
          replaceTo={props.replace}
          successCallback={setTotalCount}
          systemConfigs={props.systemConfigs}
          filterSuccessCallback={setFilterName}
          onFilterBreadCrumbs={setFilterBreadcrumbs}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
    systemConfigs: state.global.systemConfigs || [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: path => dispatch(push(path)),
    replace: path => dispatch(replace(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(CategoriesPage);
