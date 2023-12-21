import React from "react";
import FrontUserCategoriesPage from "containers/CategoriesPage";
import {sortByItems, WEBSITE_NAME} from "components/contants";
import {FrontUserCategoriesService} from "services";
import useMedia from "../../hooks/useMedia";

export const metadata = {
  title: `All Products - ${WEBSITE_NAME}`,
};

const Categories = async ({ params, searchParams }) => {
  const { deviceType, isMobile, isTablet, isDesktop } = useMedia();
  console.log(deviceType)
  const requestParams = { ...params, ...searchParams };
  const productResponse = await new Promise((resolve, reject) => {
    const { sortBy, sortDirection } =
    sortByItems.find((item) => item.key === requestParams?.sortByValue)?.params || {};
    FrontUserCategoriesService.getCategories(
      {
        ...requestParams,
        sortBy: sortBy || "displayOrder",
        sortDirection: sortDirection || "asc",
      },
      resolve,
      reject,
    );
  })

  const categories = await new Promise((resolve, reject) =>
    FrontUserCategoriesService.getCategoriesTree(resolve, reject)
  );
  const collections = await new Promise((resolve, reject) =>
    FrontUserCategoriesService.getCollections(resolve, reject)
  );
  const printAreas = await new Promise((resolve, reject) =>
    FrontUserCategoriesService.getPrintAreas(resolve, reject)
  );
  const techniques = await new Promise((resolve, reject) =>
    FrontUserCategoriesService.getTechniques(resolve, reject)
  );
  return (
    <FrontUserCategoriesPage
      isMobile={isMobile}
      isTablet={isTablet}
      isDesktop={isDesktop}
      productResponse={productResponse}
      categories={categories}
      collections={collections}
      printAreas={printAreas}
      techniques={techniques}
    />
  );
};

export default Categories;
