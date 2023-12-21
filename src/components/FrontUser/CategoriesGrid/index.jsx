import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Row } from "antd";
import { cui, events } from "utils";
import { useMediaQuery } from "react-responsive";
import {
  RESPONSIVE_MEDIAS,
  ROUTERS,
  SYSTEM_CONFIG_VALUE,
} from "components/contants";
import CategoriesFilters from "./CategoriesFilters";
import TableGrid from "components/Common/TableGrid";
import { FrontUserCategoriesService, SellerSystemService } from "services";
import CategoryItem from "./CategoryItem";
import OptionsFilters from "./OptionsFilters";
import TopCategoriesBox from "./TopCategoriesBox";
import "./style.scss";
import CollectionsFilters from "components/FrontUser/CategoriesGrid/CollectionsFilters";
import SearchDrawerBox from "components/FrontUser/SearchDrawerBox/index.jsx";
import FiltersDrawerBox from "components/FrontUser/CategoriesGrid/FiltersDrawerBox/index.jsx";
import CategoriesButtonsFilters from "components/FrontUser/CategoriesGrid/TopButtonsFilters/index.jsx";
import TopButtonsFilters from "components/FrontUser/CategoriesGrid/TopButtonsFilters/index.jsx";
import { sortByItems } from "components/FrontUser/CategoriesGrid/SortByDropdownMenu";

const gridItemTemplate = ({ item }) => {
  return <CategoryItem item={item}/>;
};

export default function CategoriesGrid({
  RELOAD_EVENT_KEY,
  CLEAR_EVENT_KEY,
  successCallback,
  filterSuccessCallback,
  onFilterBreadCrumbs,
  categoryId,
  collectionId,
  queryParams,
  systemConfigs,
  redirectTo,
  replaceTo,
}) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const isDesktop = useMediaQuery(RESPONSIVE_MEDIAS.EX_TABLET);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const ref = useRef({ firstLoad: false, totalCount: 0 });
  const [totalCount, setTotalCount] = useState(0);
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState({
    ...queryParams,
    printAreaIds:
      queryParams?.printAreaId?.split(",").map((value) => +value) || [],
    techniqueIds:
      queryParams?.techniqueId?.split(",").map((value) => +value) || [],
  });
  const gridConfig = {
    gutter: isMobile ? [16, 16] : [32, 32],
    // className: isMobile && 'box-card--mobile',
    // eslint-disable-next-line
    colSpan: (isMobile && 12) || (isTablet && 12) || (isDesktop && 8) || 4,
    searchPlaceholder: "Search in Object Mockups",
    gridItemTemplate: gridItemTemplate,
    getDataFunc: (params, successCallback, failureCallback) => {
      const {
        categoryId,
        collectionId,
        printAreaIds = [],
        techniqueIds = [],
        sortByValue,
        ...restParams
      } = params || {};
      const { sortBy, sortDirection } =
        sortByItems.find((item) => item.key === sortByValue)?.params || {};
      const requestParams = cui.removeEmpty({
        ...restParams,
        pageSize: 24,
        categoryId: !!categoryId ? categoryId : -1,
        collectionId: collectionId || "",
        printAreaId: printAreaIds.join(","),
        techniqueId: techniqueIds.join(","),
      });
      const newQueryParams = cui.removeEmpty({ sortByValue, ...requestParams });
      delete newQueryParams.collectionId;
      delete newQueryParams.categoryId;
      replaceTo({
        search: "?" + new URLSearchParams(newQueryParams),
      });
      FrontUserCategoriesService.getCategories(
        {
          ...requestParams,
          sortBy: sortBy || "displayOrder",
          sortDirection: sortDirection || "asc",
        },
        successCallback,
        failureCallback,
      );
    },
    successCallback: (response) => {
      successCallback(response?.totalCount || 0);
      setTotalCount(response?.totalCount || 0);
      ref.current.firstLoad = true;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const paginationConfig = {
    simple: true,
  };

  const onSelectedItemsChange = (selectedKeys) => {};

  const onSelectGridItem = (selectItem) => {
    const { productSlug, productId } = selectItem;
    redirectTo(
      ROUTERS.FRONT_USER_ALL_PRODUCTS + `/detail/${productSlug}/${productId}`,
    );
  };

  const reloadTable = (filters = {}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  };

  const clearTable = (filters = {}) => {
    events.publish(CLEAR_EVENT_KEY);
  };

  const onFiltersChange = (filters) => {
    reloadTable(filters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    reloadTable(newFilters);
  };

  const filterOptionsValues = {
    printAreaIds: filters?.printAreaIds || [],
    techniqueIds: filters?.techniqueIds || [],
    sortByValue: filters?.sortByValue || "",
  };

  const filtersCount = useMemo(
    () =>
      Object.keys(cui.removeEmpty(filterOptionsValues)).filter((key) =>
        typeof filterOptionsValues[key] === "object"
          ? filterOptionsValues[key].length
          : !!filterOptionsValues[key],
      ).length,
    [filterOptionsValues],
  );

  useEffect(() => {
    if (ref.current.firstLoad) {
      reloadTable({
        ...queryParams,
        categoryId: categoryId,
        collectionId: collectionId,
        pageNum: 1,
      });
    }
  }, [categoryId, collectionId]);

  useEffect(() => {
    if (ref.current.firstLoad && !queryParams?.sortByValue) {
      setFilters({});
      clearTable();
    }
  }, [queryParams?.sortByValue]);

  useEffect(() => {
    const selectedCollection = collections.find(
      (collection) => collection.collectionId === collectionId,
    );
    if (selectedCollection?.collectionName) {
      filterSuccessCallback(selectedCollection?.collectionName);
      onFilterBreadCrumbs([
        {
          breadcrumbName: selectedCollection?.collectionName,
        },
      ]);
    } else {
      let selectedCategory = null;
      const selectedCategories = [];
      categories.forEach((category) => {
        if (selectedCategory) return;
        if (category.categoryId === categoryId) {
          selectedCategory = category;
          selectedCategories.push(category);
        } else {
          selectedCategory = category.child.find(
            (subCategory) => subCategory.categoryId === categoryId,
          );
          if (selectedCategory) {
            selectedCategories.push(category);
            selectedCategories.push(selectedCategory);
          }
        }
      });
      filterSuccessCallback(selectedCategory?.categoryName);
      onFilterBreadCrumbs(
        selectedCategories.map((category, index) =>
          index === selectedCategories.length - 1
            ? {
                breadcrumbName: category?.categoryName,
              }
            : {
                breadcrumbName: category?.categoryName,
                path:
                  ROUTERS.FRONT_USER_ALL_PRODUCTS +
                  `/category/${category.categorySlug}/${category.categoryId}`,
              },
        ),
      );
    }
  }, [categoryId, collectionId, categories, collections]);

  const defaultParams = {
    categoryId,
    collectionId,
    ...filters,
  };

  const isAllowGridSelection = SellerSystemService.getSystemConfigValue(
      systemConfigs,
      SYSTEM_CONFIG_VALUE.PUBLIC_VIEW_PRODUCT_DETAIL,
    ) !== "false";
  return (
    <Row
      gutter={isMobile ? [0, 0] : [50, 0]}
      className={"categories-grid__wrapper"}
    >
      {!isMobile && (
        <Col
          span={isMobile ? 24 : 6}
          className="categories-grid__filters-sibar"
        >
          {!collectionId && (
            <CategoriesFilters
              categoryId={categoryId}
              redirectTo={redirectTo}
              successCallback={setCategories}
            />
          )}
          {!categoryId && (
            <CollectionsFilters
              collectionId={collectionId}
              redirectTo={redirectTo}
              successCallback={setCollections}
            />
          )}
          <OptionsFilters
            filters={filterOptionsValues}
            onChange={onFiltersChange}
          />
        </Col>
      )}
      {isMobile && (
        <Row gutter={[0, 16]} className="categories-grid__mobile-filters-box">
          <Col span={24}>
            <TopButtonsFilters
              categoryId={categoryId}
              collectionId={collectionId}
              redirectTo={redirectTo}
              successCallback={setCategories}
            />
          </Col>
          <Col span={24}>
            <div className="categories-grid__options-filter">
              <span>{`${totalCount} products`}</span>
              <span
                className="cursor-pointer"
                onClick={() => setOpenFilters(true)}
              >
                <span>Filters</span>
                {!!filtersCount && (
                  <span className="categories-grid__filters-count">
                    {filtersCount}
                  </span>
                )}
              </span>
            </div>
          </Col>
        </Row>
      )}
      {openFilters && (
        <FiltersDrawerBox
          redirectTo={redirectTo}
          open={openFilters}
          filters={filterOptionsValues}
          onOk={handleFilterChange}
          totalCount={totalCount}
          onCancel={() => setOpenFilters(false)}
        />
      )}
      <Col span={isMobile ? 24 : 18} className="categories-grid__product-list">
        <Row gutter={isMobile ? [0, 16] : [32, 32]}>
          {!categoryId && !collectionId && (
            <Col
              span={24}
              style={{ display: categories.length ? "block" : "none" }}
            >
              <TopCategoriesBox
                categories={categories}
                redirectTo={redirectTo}
              />
            </Col>
          )}
          <Col span={24}>
            <TableGrid
              type="grid"
              configs={gridConfig}
              paginationConfig={paginationConfig}
              actionButtonList={{}}
              defaultParams={defaultParams}
              defaultData={{}}
              headerActionsConfig={{}}
              isShowPagination={true}
              isAllowGridSelection={isAllowGridSelection}
              onSelectedItemsChange={onSelectedItemsChange}
              onSelectGridItem={onSelectGridItem}
              RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
              CLEAR_EVENT_KEY={CLEAR_EVENT_KEY}
            />
            <br />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
