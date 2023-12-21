import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { download, format } from 'utils';
import Icon from 'components/Common/Icon';
import plusIcon from 'public/images/plus-icon.svg';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS, SYSTEM_CONFIG_VALUE } from 'components/contants';
import './style.scss';
import PlainText from 'components/Common/PlainText';
import ReactHtmlParser from 'react-html-parser';
import { SellerSystemService } from 'services';

export default function ProductInfo({ systemConfigs, product = {}, isAddOrder = true, onAddOrder = () => {}}) {
  const [productOptions, setProductOptions] = useState({});
  const [productDetail, setProductDetail] = useState(product);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const contactSupportLink = SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_CONTACT_SUPPORT_LINK)
  const onOptionsChange = (name, value) => {
    const newProductOptions = {
      ...productOptions,
      [name]: value,
    }
    setProductOptions(newProductOptions);
  }

  useEffect(() => {
    if (Object.entries(productOptions).length === 0) {
      return;
    }
    let calcPrice = productDetail.price;
    let calSku = productDetail.sku;

    for (const [, value] of Object.entries(productOptions)) {
      calcPrice += value.priceAdjustment;
      calSku += '|' + value.slug;
    }
    setProductDetail(productDetail => ({
      ...productDetail,
      convertedPrice: format.formatCurrency(calcPrice),
      convertedSku: calSku,
    }))
    // eslint-disable-next-line
  }, [productOptions]);

  const buttonList = [
    !!product.designUrl && <Button className="product-info__download-button" key={"download"} type='primary' icon={<DownloadOutlined />} onClick={() => download(product.designUrl)}>Download Mockup & Template Design</Button>,
    false && isAddOrder && <Button type="primary" key={"add_order"}  icon={<Icon src={plusIcon} width={24} height={24} />} onClick={() => onAddOrder(product.id)}>Order now</Button>,
    !!contactSupportLink && <Button key={"contact"}  onClick={() => window.open(contactSupportLink, "_blank")}>Contact support</Button>,
  ];
  return (
    <div className={`product-info__wrapper`}>
      <div className='product-info__title'>{productDetail.name}</div>
      <div className='product-info__price'>
        From {productDetail.convertedPrice}
      </div>
      <div className='product-info__sku'><b>SKU:</b> {productDetail.convertedSku || productDetail.sku}</div>
      {
        productDetail.productOptions && productDetail.productOptions.map(productOption => (
          <div className='product-info__options-wrapper' key={productOption.id}>
            <div className='product-info__option-title'>{productOption.name}:</div>
            <div className='product-info__option-list'>
              {
                productOption.productOptionValues && productOption.productOptionValues.map(productOptionValue => (
                  <span className={`product-info__option-item ${productOptions[productOption.name] && productOptions[productOption.name].value === productOptionValue.value && 'product-info__option-item--selected' }`}
                       key={productOptionValue.id} onClick={() => onOptionsChange(productOption.name, productOptionValue)}>
                    {productOptionValue.value}
                  </span>
                ))
              }
            </div>
          </div>
        ))
      }
      { !!product.note && <div className='product-info__note'>{productDetail.note}</div> }
      { !!product.description && (
        <PlainText type='TextArea' className='product-info__description'>
          {ReactHtmlParser(product.description)}
        </PlainText>
      ) }
      <ButtonListWrapper
        className="product-info__button-list"
        buttonList={buttonList}
      />
    </div>
  )
}
