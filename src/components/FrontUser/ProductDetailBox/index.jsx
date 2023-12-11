import React, {useEffect, useMemo, useState} from 'react';
import { Col, Row } from 'antd';
import { FrontUserCategoriesService } from 'services';
import ProductImagesPreview from './ProductImagesPreview';
import ProductInfo from './ProductInfo';
import PlainText from 'components/Common/PlainText';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { getSellerUrl } from 'services/BaseService';
import { useMediaQuery } from 'react-responsive';

import './style.scss';
import TabsBox from "components/Common/TabsBox";
import ReactHtmlParser from "react-html-parser";

export default function ProductDetailBox({ systemConfigs, defaultProduct = null, isAddOrder, productId, redirectTo, successCallback }) {
  const [product, setProduct] = useState(defaultProduct);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const getProductDetail = () => {
    FrontUserCategoriesService.getProductDetail(productId, response => {
      setProduct(response);
      successCallback(response);
    })
  }
  useEffect(() => {
    getProductDetail();
    // eslint-disable-next-line
  }, [productId]);

  const sectionItems = useMemo(() => (product?.sections || []).map((item, index) => ({
    key: index,
    label: item.name,
    children: <PlainText>{ReactHtmlParser(item.content)}</PlainText>
  })), [product]);

  if (!product) {
    return null;
  }

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
