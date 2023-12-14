import React, { useState } from 'react';
import DrawerView, { DRAWER_TYPES } from 'components/Common/DrawerView';
import InputSearch from '../../Common/InputSearch';
import logo from 'public/images/logo.png';
import { RESPONSIVE_MEDIAS, WEBSITE_NAME } from '../../contants';
import "./style.scss";
import SearchedProductsGrid from 'components/FrontUser/SearchedProductsGrid';
import { useMediaQuery } from 'react-responsive';
import Icon from "components/Common/Icon";

export default function SearchDrawerBox({ redirectTo, open, onOk, onCancel, systemConfigs }) {
  const [searchText, setSearchText] = useState("");
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <DrawerView
      open={open}
      type={DRAWER_TYPES.TOP_DRAWER}
      onCancel={onCancel}
      onOk={onOk}
      className="search-drawer-box__wrapper"
      title={(
        <div className="search-drawer-box__header">
          { !isMobile && (
            <div className='logo-portal'>
              <a href='/'>
                <Icon src={logo} alt={WEBSITE_NAME} height={30}/>
              </a>
            </div>
          )}
          <InputSearch onChange={setSearchText}
                       placeholder="Search products"
                       value={searchText}
                       theme="search-drawer-box__search"
          />
          { !isMobile && (
            <div className='logo-portal'></div>
          )}
        </div>
      )}
    >
      <div className={`search-drawer-box__searched-products-grid ${!searchText && 'no-search'}` }>
        <SearchedProductsGrid
          searchText={searchText}
          redirectTo={redirectTo}
          onSearchClose={onCancel}
          systemConfigs={systemConfigs}
          onSearchTextChange={setSearchText}
        />
      </div>
    </DrawerView>
  )
}
