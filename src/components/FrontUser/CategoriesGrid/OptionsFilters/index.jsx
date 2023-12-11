import React, { useState, useEffect } from 'react';
import { FrontUserCategoriesService } from 'services';
import CheckboxGroupBox from "components/Common/CheckboxGroupBox";
import "./style.scss";

export default function OptionsFilters({ filters: defaultFilters, className, onChange = () => {}, }) {
  const [options, setOptions] = useState([]);
  const [filters, setFilters] = useState(defaultFilters || {});
  const transformOptions = item => {
    return {
      ...item,
      label: item.name,
      value: item.id,
    }
  }
  const getOptionsFilter = () => {
    const items = [{
      key: 'printAreaIds',
      label: "Print Area",
      getFn: FrontUserCategoriesService.getPrintAreas
    }, {
      key: 'techniqueIds',
      label: "Techniques",
      getFn: FrontUserCategoriesService.getTechniques
    }]
    Promise.all(items.map(item => new Promise((resolve, reject) => {
      item.getFn((response) => {
        resolve({
          ...item,
          options: response.map(transformOptions)
        })
      }, reject)
    }))).then(response => {
      setOptions(response)
    })
  }

  const handleFiltersChange = (value, name) => {
    const newFilters = {
      ...filters,
      [name]: value
    }
    setFilters(newFilters);
    onChange(newFilters);
  }

  useEffect(() => {
    getOptionsFilter();
  }, []);

  return (
    <div className={`options-filters__wrapper ${className}`}>
      <div className='options-filters__title'>Filters</div>
      {
        options.map(option => (
          <div className='options-filters__option-item'>
            <div className='options-filters__option-title'>{option.label}</div>
            <CheckboxGroupBox
              className={className='options-filters__option-checkbox'}
              options={option.options}
              name={option.key}
              value={filters[option.key]|| []}
              onChange={handleFiltersChange}
            />
          </div>
        ))
      }
    </div>
  );
}
