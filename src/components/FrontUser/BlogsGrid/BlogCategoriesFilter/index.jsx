import React from 'react';
import SelectButtonList from 'components/Common/SelectButtonList';
import './style.scss';

export default function BlogCategoriesFilter(
  {
    buttonList,
    value,
    onChange
  }
) {
  return (
    <SelectButtonList
      className="blog-categories-filter__wrapper"
      buttonList={buttonList}
      value={value}
      onChange={onChange}
    />
  )
}
