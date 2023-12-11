import React from 'react';
import { Pagination } from 'antd';

import './style.scss';

const PaginationBox = (props) => {
  return (
    <Pagination
      className={`pagination-box__wrapper ${props?.simple && "pagination-box__wrapper--simple"}`}
      {...props}
    />
  )
}


export default PaginationBox;
