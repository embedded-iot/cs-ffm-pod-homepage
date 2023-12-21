import React, { useMemo } from 'react';
import DropdownMenu from 'components/Common/DropdownMenu';
import { DownOutlined } from '@ant-design/icons'

import './style.scss';
import {sortByItems} from "../../../contants";


export default function SortByDropdownMenu({ value, items = sortByItems, onSortByChange }) {
  const handleMenuClick = (key) => {
    const selectedKey = items.find(item => item.key === key)?.key || ''
    onSortByChange(selectedKey)
  }
  const selectedSortByLabel = useMemo(() => {
    const selectedParams = items.find(item => item.key === value);
    return "SortBy: " + (selectedParams?.label || "Recommended");
  }, [items, value]);


  return (
    <DropdownMenu
      items={items}
      onMenuClick={handleMenuClick}
      trigger={['click']}
      // placement={'leftBottom'}
    >
      <div className="sort-by-dropdown-menu__button">
        {selectedSortByLabel}
        <DownOutlined />
      </div>
    </DropdownMenu>
  )
}
