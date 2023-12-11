import React from 'react';
import { Button } from 'antd';
import {
  SearchOutlined,
} from '@ant-design/icons';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import { getSellerUrl } from 'services/BaseService';

import './style.scss';

export default function UserActions({ redirectTo = () => {}, onSearch = () => {}, }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className={`user-action__wrapper ${!!isMobile && 'user-action__wrapper--mobile'}`} >
      {/*<Button icon={<LoginOutlined />} onClick={() => redirectTo(ROUTERS.FRONT_USER_REGISTER)}>Sign Up</Button>*/}
      { !isMobile && <Button className="user-action__search-button" ghost={true} icon={<SearchOutlined />} onClick={onSearch}>Search</Button> }
      <Button type="primary" ghost={true} onClick={() => window.open(getSellerUrl() + ROUTERS.LOGIN, '_self')}>Log in</Button>
    </div>
  );
}
