import React from 'react';
import { Menu } from 'antd';

import './style.scss';
import { matchPath } from 'react-router-dom';

export function getItem(label, key, icon, children, type, permission) {
  return {
    key,
    icon,
    children,
    label,
    type,
    permission,
  };
}

export function getAllItemsFromGroups(itemsByGroups = [], hasIcon = false) {
  let items = [];
  itemsByGroups.forEach((item) => {
    if (item.children && item.children.length) {
      item.children.forEach((sub_item) => {
        if (sub_item.children && sub_item.children.length) {
          items = [...items, ...sub_item.children]
        } else if (!sub_item.children) {
          items.push(sub_item);
        }
      });
    } else if (!item.children) {
      items.push(item);
    }
  });
  return items.map(item => hasIcon ? item : {...item, icon:  undefined});
}

export function checkRouterMatch(path, currentRouter) {
  return (path === currentRouter) || ( path !== '/' && currentRouter.startsWith(path)) || matchPath(currentRouter, {
    path,
    exact: true,
    strict: false
  });
}

export const getSelectedKeys = (keys, selectedRouter) => {
  return keys.filter(routerKey => {
    const currentRouter = selectedRouter?.[0] || '';
    return routerKey === '/' ? (currentRouter === routerKey) : currentRouter.startsWith(routerKey);
  })
}

export default function Sider({ items = [], onClick = () => {}, defaultOpenKeys = [], defaultSelectedKeys = [], ...restProps}) {
  return (
    <Menu
      defaultOpenKeys={defaultOpenKeys}
      selectedKeys={defaultSelectedKeys}
      items={items}
      onClick={onClick}
      {...restProps}
    />
  );
}
