import React, {useEffect} from 'react';
import { cui, events } from 'utils';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS, ROUTERS, SYSTEM_CONFIG_VALUE } from 'components/contants';
import TableGrid from 'components/Common/TableGrid';
import { FrontUserCategoriesService, SellerSystemService } from 'services';
import CategoryItem from 'components/FrontUser/CategoriesGrid/CategoryItem';
import "./style.scss";


const gridItemTemplate = ({ item, index }) => {
  return <CategoryItem {...item} />
}


const DEFAULT_POPULAR_TERMS = [
  'Bella Canvas Supersoft T-Shirt',
  'Gildan',
  'Gildan Ultra Cotton',
  'Mug',
]
export default function SearchedProductsGrid(
  {
    searchText,
    onSearchTextChange,
    onSearchClose,
    systemConfigs,
    redirectTo
  }
) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const RELOAD_EVENT_KEY = 'RELOAD_SEARCHED_PRODUCTS_TABLE_EVENT_KEY';
  const gridConfig = {
    gutter: isMobile ? [14, 14] : [32, 32],
    className: isMobile && 'box-card--mobile',
    // eslint-disable-next-line
    colSpan: isMobile && 12 || 6,
    searchPlaceholder: 'Search in Object Mockups',
    gridItemTemplate: gridItemTemplate,
    getDataFunc: (params, successCallback, failureCallback) => {
      const requestParams = cui.removeEmpty({
        ...params,
        pageSize: 4,
        pageNum: 1
      })
      FrontUserCategoriesService.getCategories(requestParams, successCallback, failureCallback)
    },
    successCallback: (response) => {
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const paginationConfig = {
  };

  const onSelectedItemsChange = (selectedKeys) => {

  }

  const onSelectGridItem = (selectItem) => {
    const { productSlug, productId } = selectItem;
    onSearchClose(false)
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/detail/${productSlug}/${productId}`);
  }

  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }


  useEffect(() => {
    if (!searchText) return;
    reloadTable({
      keyword : searchText,
    });
  }, [searchText]);

  const defaultParams = {};
  const popularSearchTermsStr = SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.PUBLIC_POPULAR_SEARCH_TERMS);
  const popularSearchTerms = popularSearchTermsStr ? popularSearchTermsStr.split(',') : DEFAULT_POPULAR_TERMS;
  return (
    <div className={"searched-products-grid__wrapper" }>
      { !!searchText && (
        <TableGrid type='grid'
                   configs={gridConfig}
                   paginationConfig={paginationConfig}
                   actionButtonList={{}}
                   defaultParams={defaultParams}
                   defaultData={{}}
                   headerActionsConfig={{}}
                   isShowPagination={false}
                   onSelectedItemsChange={onSelectedItemsChange}
                   onSelectGridItem={onSelectGridItem}
                   RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
        />
      )}
      { !searchText && (
        <div className="searched-products-grid__recent-terms">
          <div className="searched-products-grid__title">Popular search terms</div>
          { popularSearchTerms.map(item => (<div className="searched-products-grid__link" onClick={() => onSearchTextChange(item)}>{item}</div>))}
        </div>
      )}
    </div>
  );
}
