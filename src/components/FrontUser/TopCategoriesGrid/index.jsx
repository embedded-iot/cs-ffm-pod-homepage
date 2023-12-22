"use client"
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import TableGrid from 'components/Common/TableGrid';
import TopCategoryItem from './TopCategoryItem';

const gridItemTemplate = ({ item, index }) => {
  return <TopCategoryItem {...item} />
}

export default function TopCategoriesGrid({ topCategories, className, redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const RELOAD_EVENT_KEY = 'RELOAD_TOP_CATEGORIES_TABLE_EVENT_KEY';
  const gridConfig = {
    gutter: isMobile ? [16, 16] : [24, 40],
    // eslint-disable-next-line
    colSpan: {
      xs: 12, xl: 8, xxl: 6
    },
    gridItemTemplate: gridItemTemplate,
    getDataFunc: (params, successCallback, failureCallback) => {

    },
    successCallback: (response) => {
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };
  const handleClick = category => {
    const { categorySlug, categoryId } = category;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/category/${categorySlug}/${categoryId}`);
  }

  return (
    <TableGrid type='grid'
               className={className}
               configs={gridConfig}
               paginationConfig={{}}
               actionButtonList={{}}
               defaultParams={{}}
               defaultData={topCategories}
               headerActionsConfig={{}}
               isShowPagination={false}
               isAllowUpdateDefaultData={true}
               onSelectedItemsChange={() => {}}
               onSelectGridItem={handleClick}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
    />
  );
}
