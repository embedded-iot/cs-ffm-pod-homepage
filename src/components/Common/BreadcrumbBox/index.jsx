import React from 'react';
import { Breadcrumb } from 'antd';
import Link from "next/link";

import './style.scss';

const BreadcrumbBox = ({ routes = [], absolutePath = true, className }) => {

  const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return (route.path || !last) ? (
      <Link href={absolutePath ? route.path : paths.join('/')}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );
  }
  return (
    <Breadcrumb className={`breadcrumb-box__wrapper ${className}`}
                itemRender={itemRender}
                items={routes}
    />
  )
}


export default BreadcrumbBox;
