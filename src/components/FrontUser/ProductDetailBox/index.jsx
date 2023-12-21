"use client";

import React, {useMemo} from 'react';
import { Col, Row } from 'antd';
import ProductImagesPreview from './ProductImagesPreview';
import ProductInfo from './ProductInfo';
import PlainText from 'components/Common/PlainText';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { getSellerUrl } from 'services/BaseService';
import { useMediaQuery } from 'react-responsive';

import './style.scss';
import TabsBox from "components/Common/TabsBox";
import ReactHtmlParser from "react-html-parser";
import {useAppSelector} from "store/hooks";

export default function ProductDetailBox({ product, isAddOrder }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const systemConfigs = useAppSelector((state) => state.data.systemConfigs);
  const sectionItems = useMemo(() => (product?.sections || []).map((item, index) => ({
    key: index,
    label: item.name,
    children: <PlainText>{ReactHtmlParser(item.content)}</PlainText>
  })), [product]);

  const handleAddOrder = productId => {
    window.open(getSellerUrl() + ROUTERS.LOGIN + `?redirect=${ROUTERS.SELLER_ORDERS + '/0/productId/' + productId}`, '_self');
  }

  return (
    <div className={`${!isMobile && 'product-detail-box__wrapper'}`} key={product?.id}>
      <Row gutter={isMobile ? [0, 32] : [48, 32]} className='product-detail-box__row'>
        <Col span={isMobile ? 24 : 12}>
          <ProductImagesPreview
            product={product}
          />
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <ProductInfo product={product}
                       onAddOrder={handleAddOrder}
                       isAddOrder={isAddOrder}
                       systemConfigs={systemConfigs}
          />
        </Col>
        {
          !!sectionItems?.length && (
            <Col span={24}>
              <TabsBox
                className="product-detail-box__sections-box"
                items={sectionItems}
                type="card"
              />
            </Col>
          )
        }
      </Row>
    </div>
  );
}
