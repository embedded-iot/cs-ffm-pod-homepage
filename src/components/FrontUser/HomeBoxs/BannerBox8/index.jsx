import React from 'react';
import TopCategoriesGrid from 'components/FrontUser/TopCategoriesGrid';
import './style.scss';

export default function BannerBox8({ topCategories, customClass, redirectTo }) {
  return (
    <div className={`banner-box-6__wrapper ${customClass} banner-box-6__wrapper`}>
      <div className='banner-box-6__contents'>
        <div className='banner-box-6__title'>
          Top Categories
        </div>
      </div>
      <TopCategoriesGrid
        topCategories={topCategories}
        className="banner-box-6__blog-list"
        redirectTo={redirectTo}
      />
    </div>
  )
}
