import React, { useState, useEffect } from 'react';
import {FrontUserCategoriesService} from 'services';
import {ROUTERS} from "components/contants";
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import "./style.scss";

export default function CollectionsFilters({ className, redirectTo = () => {}, successCallback = () => {}, collectionId }) {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(collectionId);
  const transformCollection = collection => {
    return {
      ...collection,
      label: collection.name,
      value: collection.id,
    }
  }
  const getCollectionsFilter = () => {
    FrontUserCategoriesService.getCollections(response => {
      setCollections(response.map(transformCollection));
    }, () => {})
  }

  const onSelectFilter = (collection) => {
    setSelectedCollection(collection.value);
    const { collectionSlug, collectionId } = collection;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/collection/${collectionSlug}/${collectionId}`);
  }
  const goAllProducts = () => {
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS);
  }

  useEffect(() => {
    getCollectionsFilter();
  }, []);

  useEffect(() => {
    successCallback(collections);
  }, [collections]);

  useEffect(() => {
    setSelectedCollection(+collectionId);
  }, [collectionId]);

  return (
    <div className={`collections-filters__wrapper ${className}`}>
      { !collectionId && <div className='collections-filters__title'>Collections</div> }
      { !!collectionId && (
        <div className='collections-filters__all-products'>
          <Button className='collections-filters__all-products-btn' onClick={goAllProducts}>
            <LeftOutlined />
            <span>All Products</span>
          </Button>
        </div>
      ) }
      <div className={`collections-filters__list ${collectionId && "left-margin"}`}>
        {
          collections.map((collection, index) => (
            <div className={`collections-filters__item`}
                 key={index}
            >
              <div className={`collections-filters__item-label ${selectedCollection === collection.value && 'active'}`}
                   onClick={() => onSelectFilter(collection)}
              >{collection.label}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
