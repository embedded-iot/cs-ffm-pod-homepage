'use client';

import React, { useMemo, useState } from 'react';
import CategoriesGrid from 'components/FrontUser/CategoriesGrid';
import {ROUTERS} from 'components/contants';

import './style.scss';
import PublicPageHeader from "components/Share/PublicPageHeader";
import SortByDropdownMenu from 'components/FrontUser/CategoriesGrid/SortByDropdownMenu';
import queryString from 'query-string';
import { events } from 'utils';
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useAppSelector} from "store/hooks";
import {usePathname} from "next/dist/client/components/navigation";

const RELOAD_EVENT_KEY = 'RELOAD_PRODUCTS_TABLE_EVENT_KEY';
const CLEAR_EVENT_KEY = 'CLEAR_PRODUCTS_TABLE_EVENT_KEY';

function CategoriesPage({ isMobile, isTablet, isDesktop, productResponse, categories, collections, printAreas, techniques }) {
  const params = useParams();
  const searchParams = useSearchParams();
  const queryParams = queryString.parse(searchParams.toString());
  const router = useRouter();
  const pathName = usePathname();
  const { categoryId, collectionId } = params;
  const systemConfigs = useAppSelector(state => state.data.systemConfigs);
  const [filterName, setFilterName] = useState('');
  const [filterBreadcrumbs, setFilterBreadcrumbs] = useState([]);
  const title = `Design & Sell ${filterName || 'Products'} ${isMobile ? '' : `(${productResponse?.totalCount || 0})`}`;
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
      sortByValue,
      pageNum: 1
    });
  }

  const replaceTo = ({ search }) => {
    router.replace(pathName + search);
  }
  return (
    <div className={`${isMobile ? 'page-wrapper--full-width' : 'page-wrapper'} categories-page__wrapper`}>
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
          isMobile={isMobile}
          isTablet={isTablet}
          isDesktop={isDesktop}
          productResponse={productResponse}
          categories={categories}
          collections={collections}
          printAreas={printAreas}
          techniques={techniques}
          CLEAR_EVENT_KEY={CLEAR_EVENT_KEY}
          RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
          categoryId={categoryId ? +categoryId : ''}
          collectionId={collectionId ? +collectionId : ''}
          queryParams={queryParams}
          redirectTo={router.push}
          replaceTo={replaceTo}
          systemConfigs={systemConfigs}
          filterSuccessCallback={setFilterName}
          onFilterBreadCrumbs={setFilterBreadcrumbs}
        />
      </div>
    </div>
  );
}

export default CategoriesPage;
