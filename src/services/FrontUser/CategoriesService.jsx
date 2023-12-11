import { getFrontUserBaseURL, getFullPathImage } from 'services/BaseService';
import { cui, format, makeGetWithConfigs } from 'utils';
import { CommonEventsService } from 'services';

import noImage from 'public/images/no-img-1.png';

const transformProduct = product => {
  const productImages = (product.productImages || []).map(image => getFullPathImage(image.fullSizePath));
  const featureImage = getFullPathImage(product.featureImage) || productImages.length && productImages[0] || noImage;
  const productImagesExcludeFeatureImage = productImages.filter(img => img !== featureImage);
  const images = [featureImage, ...productImagesExcludeFeatureImage];
  const price = CommonEventsService.getDiscountedPrice(product.price || 0);
  const discountPercent = CommonEventsService.getDiscount();
  const sections = cui.sortBy((product?.productsSections || []).filter(section => !!section.name && !!cui.removeTags(section.content)), 'displayOrder');
  const sku = product.sku || `${product.id}`;
  return {
    ...product,
    key: product.id,
    sku: sku,
    convertedSku: sku,
    productSlug: product.slug,
    productName: product.name,
    productId: product.id,
    discountPercent,
    price,
    avatar: featureImage,
    convertedPrice: format.formatCurrency(price),
    convertedOriginPrice: format.formatCurrency(product.price),
    images,
    sections,
  }
}

function getCategories(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/products';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformProduct)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function getProductsSelect(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/products/select';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformProduct)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

const transformCategory = item => {
  const featureImage = getFullPathImage(item.category ? item.category.featureImage : '');
  return {
    ...item.category,
    avatar: featureImage,
    displayOrder: item.category ? item.category.displayOrder : 0,
    categoryId: item.category.id,
    categorySlug: item.category.slug,
    categoryName: item.category.name,
    label: item.category ? item.category.name : '-',
    value: item.category ? item.category.id : '-',
    count: item.productCount || 0,
  }
}

function getCategoriesFilter(successCallback, failureCallback, isAddAll = false) {
  const url = getFrontUserBaseURL() + '/categories';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, response => {
    const categories = cui.sortBy(response.map(transformCategory), 'displayOrder');
    const totalCount = categories.reduce((previousValue, currentValue) => previousValue + currentValue.count, 0);
    const newCategories = isAddAll ? [
      { label: 'All products', count: totalCount, value: '' },
      ...categories
    ] : categories;
    return newCategories;
  });
}


function getProductDetail(productId, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/products/' + productId;
  makeGetWithConfigs(url, {}, successCallback, failureCallback, transformProduct);
}

function getProductsOptions(products, isHasDefaultOption = true) {
  return [
    ...(isHasDefaultOption ? [{ label: 'Select product', value: '' }] : []),
    ...(products.map(product => ({...product, label: product.name, value: product.id })))
  ]
}


const transformCategoryTree = category => {
  const featureImage = getFullPathImage(category.featureImage)
  return {
    ...category,
    avatar: featureImage,
    label: category.name,
    value: category.id,
    categorySlug: category.slug,
    categoryId: category.id,
    categoryName: category.name,
    child: cui.sortBy((category.child || []).map(transformCategoryTree), 'displayOrder')
  }
}

function getCategoriesTree(successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/categories/tree';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, response => {
    const categories = cui.sortBy(response.map(transformCategoryTree), 'displayOrder');
    return categories;
  });
}


const transformTopCategory = category => {
  const featureImage = getFullPathImage(category.featureImage) || noImage
  return {
    ...category,
    avatar: featureImage,
    categorySlug: category.slug,
    categoryId: category.id,
    categoryName: category.name,
  }
}

function getTopCategories(successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/categories/report';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, response => {
    const items = response.map(transformTopCategory)
    return {
      items,
      totalCount: items.length,
      pageNum: 1,
      totalPage: 1,
    };
  });
}

function getPrintAreas(successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/print-area';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

function getTechniques(successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/technique';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

const transformCollection = collection => {
  return {
    ...collection,
    collectionSlug: collection.slug,
    collectionId: collection.id,
    collectionName: collection.name,
  }
}

function getCollections(successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/collection';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, response => {
    return (response || []).map(transformCollection)
  });
}

export {
  getCategoriesFilter,
  getCategories,
  getProductDetail,
  getProductsOptions,
  getCategoriesTree,
  getProductsSelect,
  getPrintAreas,
  getTechniques,
  getCollections,
  getTopCategories,
}
