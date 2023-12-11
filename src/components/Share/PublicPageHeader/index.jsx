import React from 'react';
import BreadcrumbBox from 'components/Common/BreadcrumbBox';
import './style.scss';

export default function PublicPageHeader({ className, title, description, breadcrumbRouters = []}) {
  const showBreadcrumb = breadcrumbRouters.length;
  const routers = [
    ...breadcrumbRouters,
  ];
  return (
    <div className={`public-page-header__wrapper ${className}`}>
      {
        !!showBreadcrumb && (
          <BreadcrumbBox routes={routers} className="public-page-header__breadcrumb"/>
        )
      }
      <div className='public-page-header__title'>{title}</div>
      <div className='public-page-header__description'>{description}</div>
    </div>
  )
}
