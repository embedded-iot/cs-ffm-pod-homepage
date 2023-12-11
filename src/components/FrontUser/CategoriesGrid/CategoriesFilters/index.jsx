import React, { useState, useEffect, useMemo } from 'react';
import { FrontUserCategoriesService } from 'services';
import "./style.scss";
import {ROUTERS} from "components/contants";
import { LeftOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { Button } from 'antd';

export default function CategoriesFilters({ className, redirectTo = () => {}, successCallback = () => {}, categoryId = '' }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId ? +categoryId : '');
  const transformCategoryTree = category => {
    return {
      ...category,
      label: category.name,
      value: category.id,
      isExpanded: !!((category.child || []).find(subCategory => selectedCategory === subCategory.value)),
      child: (category.child || []).map(transformCategoryTree)
    }
  }
  const getCategoriesFilter = () => {
    FrontUserCategoriesService.getCategoriesTree(response => {
      setCategories(response.map(transformCategoryTree));
    }, () => {})
  }

  const onSelectFilter = (category) => {
    setSelectedCategory(category.value);
    const { categorySlug, categoryId } = category;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/category/${categorySlug}/${categoryId}`);
  }
  const goAllProducts = () => {
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS);
  }

  const handleExpand = (categoryIndex) => {
    setCategories(prevCategories => prevCategories.map((category, index) => {
      return {
        ...category,
        isExpanded: categoryIndex === index ? !category.isExpanded : false,
      };
    }))
  }

  useEffect(() => {
    getCategoriesFilter();
  }, []);

  useEffect(() => {
    successCallback(categories);
  }, [categories]);

  useEffect(() => {
    setSelectedCategory(categoryId);
    if (!categoryId) {
      setCategories(previousCategories => previousCategories.map(category => ({
        ...category,
        isExpanded: false
      })))
    }
  }, [categoryId]);

  return (
    <div className={`categories-filters__wrapper ${className}`}>
      { !categoryId && <div className='categories-filters__title'>Categories</div> }
      { !!categoryId && (
        <div className='categories-filters__all-products'>
          <Button className='categories-filters__all-products-btn' onClick={goAllProducts}>
            <LeftOutlined />
            <span>All Products</span>
          </Button>
        </div>
      ) }
      <div className={`categories-filters__list ${categoryId && "left-margin"}`}>
        {
          categories.map((category, index) => (
            <div className={`categories-filters__item`}
                 key={index}
            >
              <div className={`categories-filters__item-label ${selectedCategory === category.value && 'active'}`}>
                { !!categoryId && category.child?.length ? (
                  <span className="cursor-pointer" style={{ marginRight: 5}} onClick={() => handleExpand(index)}>
                    { (category.isExpanded ? <CaretUpOutlined /> : <CaretDownOutlined />) }
                  </span>
                ) : (!!categoryId ? <span style={{ marginRight: 20}}></span> : '') }
                <span className={"cursor-pointer"} onClick={() => onSelectFilter(category)}>{category.label}</span>
              </div>
              {
                (category.isExpanded && category.child?.length) && (
                  <div className='categories-filters__child-items'>
                    {
                      category.child.map((subCategory, subIndex) => (
                        <div className={`categories-filters__item ${ selectedCategory === subCategory.value && 'categories-filters__item--active'}`}
                             key={subIndex}
                        >
                          <div className={`categories-filters__item-label ${selectedCategory === subCategory.value && 'active'}`}
                               onClick={() => onSelectFilter(subCategory)}
                          >{subCategory.label}</div>
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}
