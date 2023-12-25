import React, {useState, useEffect, useMemo} from 'react';
import {ROUTERS} from "components/contants";
import OptionsButtonsFilter from "components/FrontUser/CategoriesGrid/FiltersDrawerBox/OptionsButtonsFilter/index.jsx";
import "./style.scss";
import {SearchOutlined} from "@ant-design/icons";
import {events} from "utils";

const transformFilterOption = (item, key) => {
  return {
    ...item,
    key,
    label: item.name,
    value: item.id,
    child: (item.child || []).map((sub => transformFilterOption(sub, key)))
  }
}

export default function TopButtonsFilters({ categories: defaultCategories, collections: defaultCollections, className, redirectTo = () => {}, successCallback = () => {}, categoryId = '', collectionId = '' }) {
  const categories = useMemo(() => (defaultCategories || []).map((category) => transformFilterOption(category, 'category')), [defaultCategories]);
  const collections = useMemo(() => (defaultCollections || []).map((collection) => transformFilterOption(collection, 'collection')), [defaultCollections]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [selectedCollection, setSelectedCollection] = useState(collectionId);


  const onSelectCategoryFilter = (category) => {
    setSelectedCategory(category.value);
    setSelectedCollection('');
    const { categorySlug, categoryId } = category;
    if (categoryId) {
      redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/category/${categorySlug}/${categoryId}`);
    } else {
      redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS);
    }
  }
  const onSelectCollectionFilter = (collection) => {
    setSelectedCategory('');
    setSelectedCollection(collection.value);
    const { collectionSlug, collectionId } = collection;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/collection/${collectionSlug}/${collectionId}`);
  }
  const goAllProducts = () => {
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS);
  }

  useEffect(() => {
    setSelectedCategory(categoryId);
  }, [categoryId]);

  useEffect(() => {
    setSelectedCollection(collectionId);
  }, [collectionId]);

  const selectedFilterValue = useMemo(() => {
    return selectedCategory || selectedCollection || '';
  }, [selectedCategory, selectedCollection])

  const findCategoryOptionsParent = (categoriesOptions = [], selectedCategoryValue) => {
    for (let categoryIndex = 0; categoryIndex < categoriesOptions.length; categoryIndex++) {
      if ((categoriesOptions[categoryIndex]?.child || []).find(subCategory => subCategory.value === selectedCategoryValue)) {
        return categoriesOptions[categoryIndex];
      }
    }
    return null;
  }
  const findCategoriesOptions = (categoriesOptions = [], selectedCategoryValue) => {
    for (let categoryIndex = 0; categoryIndex < categoriesOptions.length; categoryIndex++) {
      if (categoriesOptions[categoryIndex].value === selectedCategoryValue) {
        return categoriesOptions[categoryIndex]?.child?.length ? categoriesOptions[categoryIndex]?.child : categoriesOptions;
      }
      if ((categoriesOptions[categoryIndex]?.child || []).find(subCategory => subCategory.value === selectedCategoryValue)) {
        return categoriesOptions[categoryIndex]?.child || [];
      }
    }
    return [];
  }

  const filtersOptions = useMemo(() => {
    const defaultOptions = [
      { label: <SearchOutlined />, value: 'search' },
      { label: 'All', value: '' },
    ]
    if (categoryId) {
      const selectedCategory = findCategoryOptionsParent(categories, categoryId);
      const categoriesOptions = findCategoriesOptions(categories, categoryId);
      return  [
        { label: <SearchOutlined />, value: 'search' },
        { ...(selectedCategory || {}), label: 'All', value: categoriesOptions?.length && categoriesOptions[0].parentId || '', key: 'category' }
        , ...categoriesOptions]
    } else if (collectionId) {
      return [...defaultOptions, ...collections]
    }
    return [...defaultOptions, ...categories, ...collections]
  }, [categories, collections, categoryId, collectionId])

  const handleFiltersChange = (value, name, selectedOption) => {
    if (value === 'search') {
      events.publish("SEARCH_PRODUCT_DRAWER_LISTENER");
    } else if (!value) {
      goAllProducts();
    } else {
      const selectedFilter = filtersOptions.find(option => option.label === selectedOption.label && option.value === value);
      if (selectedFilter) {
        if (selectedOption.key === 'category') {
          onSelectCategoryFilter(selectedFilter)
        } else if (selectedOption.key === 'collection') {
          onSelectCollectionFilter(selectedFilter)
        }
      }
    }
  }

  return (
    <div className={`top-buttons-filters__wrapper ${className}`}>
      <OptionsButtonsFilter
        value={selectedFilterValue}
        buttonList={filtersOptions}
        onChange={handleFiltersChange}
      />
    </div>
  );
}
