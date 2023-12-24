import React, { useMemo } from 'react';
import Sider, {getItem, getSelectedKeys} from 'components/Common/Sider';
import { ROUTERS } from 'components/contants';
import Link from 'next/link'
import {useAppSelector} from "store/hooks";
import "./style.scss";

const transformCategoryTree = category => {
  const { categorySlug, categoryName, categoryId } = category;
  return {
    type: "group",
    label: '',
    className: "public-sider__sub-menu",
    children: [
      {
        label: <span>{categoryName}</span>,
        key: ROUTERS.FRONT_USER_ALL_PRODUCTS + `/category/${categorySlug}/${categoryId}`
      },
      ...((category.child || []).map(subCategory => ({
        label: subCategory.categoryName,
        key: ROUTERS.FRONT_USER_ALL_PRODUCTS + `/category/${subCategory.categorySlug}/${subCategory.categoryId}`
      })))
    ]
  }
}

const transformCollections = (collections) => {
  return [{
    type: "group",
    label: '',
    className: "public-sider__sub-menu",
    children: [
      ...((collections || []).map(collection => ({
        label: <b>{collection.collectionName}</b>,
        key: ROUTERS.FRONT_USER_ALL_PRODUCTS + `/collection/${collection.collectionSlug}/${collection.collectionId}`
      })))
    ]
  }]
}

export default function PublicSider({ categories, collections, selectedRouters = [], redirectTo = () => {} }) {
  const isMobile = useAppSelector(state => state.data.isMobile);
  const categoriesRouters = useMemo(() => categories.map(transformCategoryTree), [categories]);
  const collectionsRouters = useMemo(() => transformCollections(collections), [collections]);
  const items = useMemo(() => {
    const routers = [
      getItem(<Link href={ROUTERS.ROOT}>Home</Link>, ROUTERS.ROOT),
      isMobile ? getItem(<Link href={ROUTERS.FRONT_USER_ALL_PRODUCTS}>Products</Link>, ROUTERS.FRONT_USER_ALL_PRODUCTS) : getItem(<Link href={ROUTERS.FRONT_USER_ALL_PRODUCTS}>Products</Link>, ROUTERS.FRONT_USER_ALL_PRODUCTS, undefined,
        [...collectionsRouters,...categoriesRouters]
      ),
      // getItem(<Link href={ROUTERS.FRONT_USER_SKU}>SKU</Link>, ROUTERS.FRONT_USER_SKU),
      getItem(<Link href={ROUTERS.FRONT_USER_BLOGS}>Blogs</Link>, ROUTERS.FRONT_USER_BLOGS),
    ];
    return routers;
  }, [categoriesRouters, collectionsRouters]);

  const defaultOpenKeys = []

  const onClick = (e) => {
    redirectTo(e.key);
  };
  const KEYS = [
    ROUTERS.ROOT,
    ROUTERS.FRONT_USER_ALL_PRODUCTS,
    ROUTERS.FRONT_USER_BLOGS,
  ];

  return (
    <Sider items={items}
           defaultOpenKeys={defaultOpenKeys}
           defaultSelectedKeys={getSelectedKeys(KEYS, selectedRouters)}
           onClick={onClick}
           className={!isMobile && 'public-sider__wrapper'}
           mode={!isMobile && "horizontal" }
    />
  );
}
