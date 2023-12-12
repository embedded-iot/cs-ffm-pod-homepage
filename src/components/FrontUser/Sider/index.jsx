import React, { useEffect, useMemo, useState } from 'react';
import Sider, {getItem, getSelectedKeys} from 'components/Common/Sider';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link'
import { FrontUserCategoriesService } from 'services';
import { DownOutlined } from '@ant-design/icons'
import arrowLeft from 'public/images/arrow-left.png';
import "./style.scss";
import Icon from 'components/Common/Icon';

export default function PublicSider({ selectedRouters = [], redirectTo = () => {} }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [categoriesRouters, setCategoriesRouters] = useState([]);
  const [collectionsRouters, setCollectionsRouters] = useState([]);
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
  const getCategoriesFilter = () => {
    FrontUserCategoriesService.getCategoriesTree(response => {
      setCategoriesRouters(response.map(transformCategoryTree));
    }, () => {})
  }

  const transformCollections = collections => {
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

  const getCollectionsFilter = () => {
    FrontUserCategoriesService.getCollections(response => {
      setCollectionsRouters(transformCollections(response));
    }, () => {})
  }

  useEffect(() => {
    getCategoriesFilter();
    getCollectionsFilter();
  }, []);
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
