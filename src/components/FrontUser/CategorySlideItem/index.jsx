import React from 'react';
import categoryImg from 'public/images/product_ex.svg'
import { ROUTERS } from 'components/contants';

import './style.scss';

export default function CategorySlideItem({ redirectTo = () => {}, customClass, category = {} }) {
  const handleClick = category => {
    const { categorySlug, categoryId } = category;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/category/${categorySlug}/${categoryId}`);
  }
  const { categoryName, avatar, id } = category;
  return (
    <div className={`category-card__wrapper ${customClass}`} key={id} onClick={() => handleClick(category)}>
      <div className='category-card__contents'>
        <div className='category-card__title'>{categoryName}</div>
        <div className='category-card__arrow-icon' />
      </div>
      <div className='category-card__img'>
        <img src={avatar || categoryImg} alt={categoryName} />
      </div>
    </div>
  )
}
