import React, { useMemo } from 'react';
import DropdownMenu from 'components/Common/DropdownMenu';
import { DownOutlined } from '@ant-design/icons'

import './style.scss';

export const sortByItems = [
  {
    key: "Recommended",
    label: "Recommended",
    params: {
      sortBy: "displayOrder",
      sortDirection: "desc"
    }
  },
  {
    key: "Newest",
    label: "Newest",
    params: {
      sortBy: "id",
      sortDirection: "desc"
    }
  },
  {
    key: "NameAZ",
    label: "Name (A-Z)",
    params: {
      sortBy: "name",
      sortDirection: "asc"
    }
  },
  {
    key: "NameZA",
    label: "Name (Z-A)",
    params: {
      sortBy: "name",
      sortDirection: "desc"
    }
  },
  {
    key: "BasePriceHighLow",
    label: "Base price (High-low)",
    params: {
      sortBy: "price",
      sortDirection: "desc"
    }
  },
  {
    key: "BasePriceLowHigh",
    label: "Base price (Low-high)",
    params: {
      sortBy: "price",
      sortDirection: "asc"
    }
  },
];

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
