import React, {useMemo, useState} from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import BreadcrumbBox from 'components/Common/BreadcrumbBox';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import ProductDetailBox from 'components/FrontUser/ProductDetailBox';
import RelatedProductForProductDetail from 'components/FrontUser/RelatedProductForProductDetail';
import { useMediaQuery } from 'react-responsive';

import './style.scss';


function ProductDetailPage(props) {
  const { productId } = props.match ? props.match.params : {};
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [product, setProduct] = useState(null);
  const breadcrumbRoutes = useMemo(() => {
    const defaultRouters = [
      {
        path: ROUTERS.FRONT_USER_ALL_PRODUCTS,
        breadcrumbName: 'All products',
      },
    ]
    const categoryRouters = (product?.productsCategories || []).map(item => {
      const { category, categoryId } = item;
      const { name: categoryName, slug: categorySlug } = category;
      return {
        path: `${ROUTERS.FRONT_USER_ALL_PRODUCTS}/category/${categorySlug}/${categoryId}`,
        breadcrumbName: categoryName,
      }
    })
    return [...defaultRouters, ...categoryRouters];
  }, [product]);

  const selectedCategory = useMemo(() => {
    const categories = product?.productsCategories || [];
    return categories.length ? categories[categories.length - 1] : null;
  }, [product]);


  return (
    <div className={`${isMobile ? 'page-wrapper--full-width' : 'page-wrapper'} product-detail-page__wrapper`}>
      <Helmet>
        <title>{product?.productName}</title>
      </Helmet>
      <div className="page-contents">
        <BreadcrumbBox className={'product-detail-page__breadcrumb'}
                       routes={breadcrumbRoutes}
        />
        <ProductDetailBox
          productId={productId}
          redirectTo={props.push}
          successCallback={setProduct}
          systemConfigs={props.systemConfigs}
        />
        {
          !!selectedCategory && (
            <RelatedProductForProductDetail
              categoryId={selectedCategory.categoryId}
              productId={productId}
              redirectTo={props.push}
            />
          )
        }
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
    systemConfigs: state.global.systemConfigs || [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(ProductDetailPage);
