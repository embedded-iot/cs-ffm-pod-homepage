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
import { SellerSystemService } from "services";
import CategoryItem from "./CategoryItem";
import OptionsFilters from "./OptionsFilters";
import TopCategoriesBox from "./TopCategoriesBox";
import "./style.scss";
import CollectionsFilters from "components/FrontUser/CategoriesGrid/CollectionsFilters";
import FiltersDrawerBox from "components/FrontUser/CategoriesGrid/FiltersDrawerBox/index.jsx";
import TopButtonsFilters from "components/FrontUser/CategoriesGrid/TopButtonsFilters/index.jsx";

const gridItemTemplate = ({ item }) => {
  return <CategoryItem item={item}/>;
};

export default function CategoriesGrid({
  isMobile,
  productResponse,
  categories,
  collections,
  printAreas,
  techniques,
  RELOAD_EVENT_KEY,
  filterSuccessCallback,
  onFilterBreadCrumbs,
  categoryId,
  collectionId,
  queryParams,
  systemConfigs,
  redirectTo,
  replaceTo,
}) {
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
    colSpan: {
      xs: 12, xl:8, xxl: 4
    },
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
    },
    successCallback: (response) => {

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
      wrap={isMobile}
    >
      {!isMobile && (
        <Col
          xs={24}
          flex={"250px"}
          className="categories-grid__filters-sibar"
        >
          {!collectionId && (
            <CategoriesFilters
              categories={categories}
              categoryId={categoryId}
              redirectTo={redirectTo}
            />
          )}
          {!categoryId && (
            <CollectionsFilters
              collections={collections}
              collectionId={collectionId}
              redirectTo={redirectTo}
            />
          )}
          <OptionsFilters
            printAreas={printAreas}
            techniques={techniques}
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
              categories={categories}
              collections={collections}
              redirectTo={redirectTo}
            />
          </Col>
          <Col span={24}>
            <div className="categories-grid__options-filter">
              <span>{`${productResponse?.totalCount || 0} products`}</span>
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
          printAreas={printAreas}
          techniques={techniques}
          redirectTo={redirectTo}
          open={openFilters}
          filters={filterOptionsValues}
          onOk={handleFilterChange}
          totalCount={productResponse?.totalCount || 0}
          onCancel={() => setOpenFilters(false)}
        />
      )}
      <Col flex="auto" className="categories-grid__product-list">
        <Row gutter={isMobile ? [0, 16] : [32, 32]}>
          {!categoryId && !collectionId && (
            <Col
              span={24}
              style={{ display: categories.length ? "block" : "none" }}
            >
              <TopCategoriesBox
                isMobile={isMobile}
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
              defaultData={productResponse}
              headerActionsConfig={{}}
              isShowPagination={true}
              isAllowUpdateDefaultData={true}
              isAllowGridSelection={isAllowGridSelection}
              onSelectedItemsChange={onSelectedItemsChange}
              onSelectGridItem={onSelectGridItem}
              RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
            />
            <br />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
