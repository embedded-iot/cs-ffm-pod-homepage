import React, { useState } from 'react';
import CheckboxGroupBox from "components/Common/CheckboxGroupBox";
import "./style.scss";

const transformOptions = item => {
  return {
    ...item,
    label: item.name,
    value: item.id,
  }
}

export default function OptionsFilters({ printAreas, techniques, filters: defaultFilters, className, onChange = () => {}, }) {
  const [options, setOptions] = useState([{
    key: 'printAreaIds',
    label: "Print Area",
    options: printAreas.map(transformOptions)
  }, {
    key: 'techniqueIds',
    label: "Techniques",
    options: techniques.map(transformOptions)
  }]);
  const [filters, setFilters] = useState(defaultFilters || {});

  const handleFiltersChange = (value, name) => {
    const newFilters = {
      ...filters,
      [name]: value
    }
    setFilters(newFilters);
    onChange(newFilters);
  }

  return (
    <div className={`options-filters__wrapper ${className}`}>
      <div className='options-filters__title'>Filters</div>
      {
        options.map(option => (
          <div className='options-filters__option-item' key={option.key}>
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
