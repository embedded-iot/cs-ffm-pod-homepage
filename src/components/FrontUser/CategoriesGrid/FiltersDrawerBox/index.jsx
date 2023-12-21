import React, {useEffect, useMemo, useState} from 'react';
import DrawerView, { DRAWER_TYPES } from 'components/Common/DrawerView';
import { ArrowLeftOutlined } from '@ant-design/icons';
import "./style.scss";
import {FrontUserCategoriesService} from "services";
import OptionsButtonsFilter from "./OptionsButtonsFilter";
import {Button} from "antd";
import {sortByItems} from "../../../contants";

const transformOptions = item => {
  return {
    ...item,
    label: item.name,
    value: item.id,
  }
}

export default function FiltersDrawerBox({  printAreas, techniques, filters: defaultFilters, open, onOk, onCancel, totalCount }) {
  const [filters, setFilters] = useState(defaultFilters || {});

  const options = useMemo(() => [
    {
      key: 'sortByValue',
      label: "Sort By",
      options: sortByItems.map(item => ({
        name: item.label,
        id: item.key,
      })).map(transformOptions)
    }, {
      key: 'printAreaIds',
      label: "Print Area",
      multiple: true,
      toggle: true,
      options: printAreas.map(transformOptions)
    }, {
      key: 'techniqueIds',
      label: "Techniques",
      multiple: true,
      toggle: true,
      options: techniques.map(transformOptions)
    }], [printAreas, techniques]);


  const handleResetFilters = () => {
    const newFilters = {
      printAreaIds: [],
      techniqueIds: [],
    }
    setFilters(newFilters);
    onOk(newFilters);
    onCancel();
  }

  const handleFiltersChange = (value, name) => {
    const newFilters = {
      ...filters,
      [name]: value
    }
    setFilters(newFilters);
    onOk(newFilters);
  }

  return (
    <DrawerView
      open={open}
      type={DRAWER_TYPES.RIGHT_DRAWER}
      onCancel={onCancel}
      onOk={onOk}
      className="filters-drawer-box__wrapper"
      title={(
        <div className="filters-drawer-box__header">
          <b>Filters</b>
          <span onClick={handleResetFilters}>Reset all</span>
        </div>
      )}
      closeIcon={<ArrowLeftOutlined/>}
    >
      <div className={`filters-drawer-box__filters-contents` }>
        <div className={`filters-drawer-box__filters-list` }>
          {
            options.map(option => (
              <div key={option.key} className={`filters-drawer-box__filter-item` }>
                <div className={`filters-drawer-box__filter-label` }>
                  { option.label }
                </div>
                <OptionsButtonsFilter
                  value={filters[option.key]}
                  buttonList={option.options}
                  name={option.key}
                  multiple={option.multiple}
                  toggle={option.toggle}
                  onChange={handleFiltersChange}
                />
              </div>
            ))
          }
        </div>
        <Button className={`filters-drawer-box__footer` } type={"primary"} onClick={onCancel}>
          {`Show ${totalCount} results`}
        </Button>
      </div>
    </DrawerView>
  )
}
