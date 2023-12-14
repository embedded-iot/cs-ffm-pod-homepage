import React from 'react';
import { Card } from 'antd';
import './style.scss';
import Icon from "../../../Common/Icon";

export default function TopCategoryItem({ className, allowClick = true, onClick = () => {}, imgProps = {}, ...restProp}) {
  const { id, name, avatar, totalItems } = restProp || {};
  return (
    <Card
      className={`top-category-item__wrapper ${className}`}
      cover={<Icon alt={name} src={avatar} {...imgProps} />}
      onClick={() => allowClick && onClick(restProp)}
      key={id}
    >
      <div className='top-category-item__title'>{name}</div>
      <div className='top-category-item__description'>{`${totalItems} items`}</div>
    </Card>
  )
}
