/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { goBack, push } from 'connected-react-router';
// import { BackTop } from 'antd';
// import { UpCircleOutlined } from '@ant-design/icons';
// import { useMediaQuery } from 'react-responsive';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { setGlobalStore } from './actions';
import { authentication, events, globalStore } from 'utils';

import Header from 'components/Share/Header';

import LayoutWrapper from 'components/Share/Layout/LayoutWapper';
import PublicLayoutWrapper from 'components/Share/Layout';
import NormalLayoutWrapper from 'components/Share/Layout/NormalLayoutWrapper';

import FrontUserHeader from 'components/FrontUser/Header';
import FrontUserFooter from 'components/FrontUser/Footer';
import FrontUserSider from 'components/FrontUser/Sider';

import SellerSider from 'components/Seller/Sider';
import SellerFooter from 'components/Seller/Footer';

import AdminSider from 'components/Admin/Sider';

import ProducerSider from 'components/Producer/Sider';

import LoginPage from 'containers/Common/LoginPage/Loadable';
import RegisterPage from 'containers/Common/RegisterPage/Loadable';
import ForgotPasswordPage from 'containers/Common/ForgotPasswordPage/Loadable';
import ChangePasswordPage from 'containers/Common/ChangePasswordPage/Loadable';

import FrontUserHomePage from 'containers/HomePage/Loadable';
import FrontUserAllProductsPage from 'containers/CategoriesPage/Loadable';
import FrontUserProductDetailPage from 'containers/ProductDetailPage/Loadable';
import FrontUserSKUPage from 'containers/FrontUser/SKUPage/Loadable';
import FrontUserBlogsPage from 'containers/BlogsPage/Loadable';
import FrontUserBlogDetailPage from 'containers/BlogDetailPage/Loadable';
import FrontUserStaticBlogsPage from 'containers/StaticBlogsPage/Loadable';

import SellerContestPage from 'containers/Seller/ContestPage/Loadable';
import SellerHomePage from 'containers/Seller/HomePage/Loadable';
import SellerOrdersPage from 'containers/Seller/OrdersPage/Loadable';
import SellerOrderDetailPage from 'containers/Seller/OrderDetailPage/Loadable';
import SellerDesignsPage from 'containers/Seller/DesignsPage/Loadable';
import SellerStoresPage from 'containers/Seller/StoresPage/Loadable';
import SellerIntegrationsPage from 'containers/Seller/IntegrationsPage/Loadable';
import SellerIntegrationOrdersPage from 'containers/Seller/IntegrationOrdersPage/Loadable';
import SellerStoreDetailPage from 'containers/Seller/StoreDetailPage/Loadable';
import SellerWalletPage from 'containers/Seller/WalletPage/Loadable';
import SellerMyAccountPage from 'containers/Seller/MyAccountPage/Loadable';
import SellerIntegrationsTokenPage from 'containers/Seller/IntegrationsTokenPage/Loadable';
import SellerNotificationsPage from 'containers/Seller/NotificationsPage/Loadable';
import SellerProductCategoriesPage from 'containers/Seller/ProductCategoriesPage/Loadable';


import AdminHomePage from 'containers/Admin/HomePage/Loadable';
import AdminProductManagementPage from 'containers/Admin/ProductManagementPage/Loadable';
import AdminProductDetailManagementPage from 'containers/Admin/ProductDetailManagementPage/Loadable';
import AdminCategoriesManagementPage from 'containers/Admin/CategoriesManagementPage/Loadable';
import AdminUsersManagementPage from 'containers/Admin/UsersManagementPage/Loadable';
import AdminUserDetailManagementPage from 'containers/Admin/UserDetailManagementPage/Loadable';
import AdminOrdersManagementPage from 'containers/Admin/OrdersManagementPage/Loadable';
import AdminTrackingOrdersManagementPage from 'containers/Admin/TrackingOrdersManagementPage/Loadable';
import AdminOrderDetailManagementPage from 'containers/Admin/OrderDetailManagementPage/Loadable';
import AdminTransactionsManagementPage from 'containers/Admin/TransactionsManagementPage/Loadable';
import AdminSellerWalletManagementPage from 'containers/Admin/SellerWalletManagementPage/Loadable';
import AdminBanksManagementPage from 'containers/Admin/BanksManagementPage/Loadable';
import AdminStoresManagementPage from 'containers/Admin/StoresManagementPage/Loadable';
import AdminIntegrationOrdersManagementPage from 'containers/Admin/IntegrationOrdersManagementPage/Loadable';
import AdminSellersManagementPage from 'containers/Admin/SellersManagementPage/Loadable';
import AdminDesignsManagementPage from 'containers/Admin/DesignsManagementPage/Loadable';
import AdminProducersManagementPage from 'containers/Admin/ProducersManagementPage/Loadable';
import AdminProducerWalletManagementPage from 'containers/Admin/ProducerWalletManagementPage/Loadable';
import AdminWalletTransactionsManagementPage from 'containers/Admin/WalletTransactionsManagementPage/Loadable';
import AdminSystemManagementPage from 'containers/Admin/SystemManagementPage/Loadable';
import AdminStatisticsManagementPage from 'containers/Admin/StatisticsManagementPage/Loadable';
import AdminNotificationsManagementPage from 'containers/Admin/NotificationsManagementPage/Loadable';
import AdminFAQsManagementPage from 'containers/Admin/FAQsManagementPage/Loadable';
import AdminBlogCategoriesManagementPage from 'containers/Admin/BlogCategoriesManagementPage/Loadable';
import AdminBlogsManagementPage from 'containers/Admin/BlogsManagementPage/Loadable';
import AdminEmailsManagementPage from 'containers/Admin/EmailsManagementPage/Loadable';
import AdminEventsManagementPage from 'containers/Admin/EventsManagementPage/Loadable';
import AdminCodeRefsManagementPage from 'containers/Admin/CodeRefsManagementPage/Loadable';
import AdminEmailTemplatesManagementPage from 'containers/Admin/EmailTemplatesManagementPage/Loadable';
import AdminNotificationsPage from 'containers/Admin/NotificationsPage/Loadable';
import AdminContestPage from 'containers/Admin/ContestManagementPage/Loadable';
import AdminCollectionsManagementPage from 'containers/Admin/CollectionsManagementPage/Loadable';
import AdminTechniquesManagementPage from 'containers/Admin/TechniquesManagementPage/Loadable';
import AdminPrintAreasManagementPage from 'containers/Admin/PrintAreasManagementPage/Loadable';

import ProducerWalletPage from 'containers/Producer/WalletPage/Loadable';
import ProducerOrdersPage from 'containers/Producer/OrdersPage/Loadable';
import ProducerTrackingOrdersPage from 'containers/Producer/TrackingOrdersManagementPage/Loadable';
import ProducerOrderDetailPage from 'containers/Producer/OrderDetailPage/Loadable';
import ProducerMyAccountPage from 'containers/Producer/MyAccountPage/Loadable';

import {
  ADMIN_ROLES,
  PERMISSION_VALUES, PRODUCER_ROLES, RESPONSIVE_MEDIAS,
  ROLE_PERMISSIONS_VALUES,
  ROUTERS,
  STATE_VALUES,
  WEBSITE_NAME,
} from 'components/contants';

import {
  AdminNotificationsService,
  FrontUserEventsService,
  SellerNotificationsService,
  SellerSystemService,
  UserService,
} from 'services';

import './style.scss';
import { useMediaQuery } from 'react-responsive';
import SpinnerBox from 'components/Common/SpinnerBox';

const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

import { createGlobalStyle } from 'styled-components';


const PrivateRoute = (props) => {
  const { isAuthenticated, ...restProps } = props;
  if (!isAuthenticated)
    return (
      <Redirect
        to={{
          pathname: ROUTERS.LOGIN,
          search: `?redirect=${props.location.pathname}`,
        }}
      />
    );
  return (<Route {...restProps} />)
}

const PublicAppContent = (props) => (
  <Switch>
    <Route exact path={ROUTERS.LOGIN} component={LoginPage} />
    <Route exact path={ROUTERS.FORGOT_PASSWORD} component={ForgotPasswordPage} />
    <Route exact path={ROUTERS.CHANGE_PASSWORD} component={ChangePasswordPage} />
  </Switch>
);

const FrontUserAppContent = (props) => (
  <>
    <Switch>
      <Route exact path={ROUTERS.FRONT_USER_REGISTER} component={RegisterPage} />
      <Route exact path={ROUTERS.ROOT} component={FrontUserHomePage} />
      <Route exact path={ROUTERS.FRONT_USER_ALL_PRODUCTS} component={FrontUserAllProductsPage} />
      <Route exact path={ROUTERS.FRONT_USER_ALL_PRODUCTS_WITH_CATEGORY} component={FrontUserAllProductsPage} />
      <Route exact path={ROUTERS.FRONT_USER_ALL_PRODUCTS_WITH_COLLECTION} component={FrontUserAllProductsPage} />
      <Route exact path={ROUTERS.FRONT_USER_PRODUCT_DETAIL} component={FrontUserProductDetailPage} />
      <Route exact path={ROUTERS.FRONT_USER_SKU} component={FrontUserSKUPage} />
      <Route exact path={ROUTERS.FRONT_USER_BLOGS} component={FrontUserBlogsPage} />
      <Route exact path={ROUTERS.FRONT_USER_BLOGS_WITH_CATEGORY} component={FrontUserBlogsPage} />
      <Route exact path={ROUTERS.FRONT_USER_BLOG_DETAIL} component={FrontUserBlogDetailPage} />
      <Route exact path={ROUTERS.FRONT_USER_STATIC_BLOG_DETAIL} component={FrontUserStaticBlogsPage} />
    </Switch>
  </>

)

const AppContent = (props) => (
  <Switch>
    <PrivateRoute exact path={ROUTERS.CONTEST} component={SellerContestPage} isAuthenticated={props.isLogin}/>
    <PrivateRoute exact path={ROUTERS.ROOT} component={SellerHomePage} isAuthenticated={props.isLogin}/>
    <PrivateRoute exact path={ROUTERS.SELLER_ORDERS} component={SellerOrdersPage} isAuthenticated={props.isLogin && authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_ORDERS)}/>
    <PrivateRoute exact path={ROUTERS.SELLER_DETAIL_ORDER} component={SellerOrderDetailPage} isAuthenticated={props.isLogin && authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_ORDER)}/>
    <PrivateRoute exact path={ROUTERS.SELLER_DETAIL_ORDER_WITH_PRODUCT} component={SellerOrderDetailPage} isAuthenticated={props.isLogin && authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_ORDER)}/>
    <PrivateRoute exact path={ROUTERS.SELLER_DESIGN_LIBRARY} component={SellerDesignsPage} isAuthenticated={props.isLogin && authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_DESIGNS)}/>
    <PrivateRoute exact path={ROUTERS.SELLER_STORES} component={SellerStoresPage} isAuthenticated={props.isLogin && authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_STORES)}/>
    <PrivateRoute exact path={ROUTERS.SELLER_DETAIL_STORE} component={SellerStoreDetailPage} isAuthenticated={props.isLogin && authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_STORE)}/>
    <Route exact path={ROUTERS.SELLER_INTEGRATIONS_WITH_VENDOR} component={SellerIntegrationsPage} />
    <PrivateRoute exact path={ROUTERS.SELLER_INTEGRATION_ORDERS} component={SellerIntegrationOrdersPage} isAuthenticated={props.isLogin && authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_STORES)}/>
    <Route exact path={ROUTERS.SELLER_INTEGRATIONS_GET_TOKEN} component={SellerIntegrationsTokenPage} />
    <PrivateRoute exact path={ROUTERS.SELLER_WALLET} component={SellerWalletPage} isAuthenticated={props.isLogin && authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_WALLET)}/>
    <PrivateRoute exact path={ROUTERS.SELLER_MY_ACCOUNT} component={SellerMyAccountPage} isAuthenticated={props.isLogin}/>
    <PrivateRoute exact path={ROUTERS.NOTIFICATIONS} component={SellerNotificationsPage} isAuthenticated={props.isLogin}/>
    <PrivateRoute exact path={ROUTERS.SELLER_PRODUCT_CATEGORY} component={SellerProductCategoriesPage} isAuthenticated={props.isLogin}/>
  </Switch>
)

const AdminAppContent = (props) => (
  <Switch>
    <PrivateRoute exact path={ROUTERS.CONTEST} component={AdminContestPage} isAuthenticated={props.isLogin}/>
    <PrivateRoute exact path={ROUTERS.ROOT} component={AdminHomePage} isAuthenticated={props.isLogin && props.isAdmin}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_PRODUCTS_MANAGEMENT} component={AdminProductManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_PRODUCTS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_DETAIL_PRODUCT} component={AdminProductDetailManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_PRODUCT)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_CATEGORIES_MANAGEMENT} component={AdminCategoriesManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_CATEGORIES)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_USERS_MANAGEMENT} component={AdminUsersManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_USERS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_DETAIL_USER} component={AdminUserDetailManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_USER)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_DETAIL_USER_WITH_ROLE} component={AdminUserDetailManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_USER)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_ORDERS_MANAGEMENT} component={AdminOrdersManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_ORDERS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_TRACKING_ORDERS_MANAGEMENT} component={AdminTrackingOrdersManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_TRACKING_ORDERS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_DETAIL_ORDER_MANAGEMENT} component={AdminOrderDetailManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_ORDERS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_TRANSACTIONS_MANAGEMENT} component={AdminTransactionsManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_TRANSACTIONS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SELLER_WALLETS_MANAGEMENT} component={AdminSellerWalletManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_SELLER_WALLETS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_BANKS_MANAGEMENT} component={AdminBanksManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_BANKS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_STORES_MANAGEMENT} component={AdminStoresManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_STORES)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_INTEGRATION_ORDERS} component={AdminIntegrationOrdersManagementPage} isAuthenticated={props.isLogin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_SELLERS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SELLERS_MANAGEMENT} component={AdminSellersManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_SELLERS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SELLERS_MANAGEMENT_WITH_FILTER} component={AdminSellersManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_SELLERS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_DESIGNS_MANAGEMENT} component={AdminDesignsManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_DESIGNS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_PRODUCERS_MANAGEMENT} component={AdminProducersManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_PRODUCERS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_PRODUCER_WALLETS_MANAGEMENT} component={AdminProducerWalletManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_PRODUCER_WALLETS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SELLER_WALLET_DETAILS_MANAGEMENT} component={AdminWalletTransactionsManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_SELLER_WALLETS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SYSTEM_CONFIGS_MANAGEMENT} component={AdminSystemManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_CONFIGS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_STATISTICS_MANAGEMENT} component={AdminStatisticsManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_STATISTICS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SYSTEM_NOTIFICATIONS_MANAGEMENT} component={AdminNotificationsManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_FAQS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SYSTEM_FAQS_MANAGEMENT} component={AdminFAQsManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_NOTIFICATIONS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SYSTEM_BLOG_CATEGORIES_MANAGEMENT} component={AdminBlogCategoriesManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_BLOGS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SYSTEM_BLOGS_MANAGEMENT} component={AdminBlogsManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_BLOGS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SYSTEM_EMAILS_MANAGEMENT} component={AdminEmailsManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_EMAILS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SYSTEM_EVENTS_MANAGEMENT} component={AdminEventsManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_EVENTS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SYSTEM_CODE_REFS_MANAGEMENT} component={AdminCodeRefsManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_USER_REFS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_SYSTEM_EMAIL_TEMPLATES_MANAGEMENT} component={AdminEmailTemplatesManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_EMAIL_TEMPLATES)}/>
    <PrivateRoute exact path={ROUTERS.NOTIFICATIONS} component={AdminNotificationsPage} isAuthenticated={props.isLogin && props.isAdmin}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_COLLECTIONS_MANAGEMENT} component={AdminCollectionsManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_COLLECTIONS)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_TECHNIQUES_MANAGEMENT} component={AdminTechniquesManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_TECHNIQUES)}/>
    <PrivateRoute exact path={ROUTERS.ADMIN_PRINT_AREAS_MANAGEMENT} component={AdminPrintAreasManagementPage} isAuthenticated={props.isLogin && props.isAdmin && authentication.getPermission(PERMISSION_VALUES.ADMIN_VIEW_PRINT_AREAS)}/>
  </Switch>
)

const ProducerAppContent = (props) => (
  <Switch>
    <Redirect exact={true} from={ROUTERS.ROOT} to={ROUTERS.PRODUCER_ORDERS_MANAGEMENT} />
    <PrivateRoute exact path={ROUTERS.PRODUCER_ORDERS_MANAGEMENT} component={ProducerOrdersPage} isAuthenticated={props.isLogin && props.isProducer && authentication.getPermission(PERMISSION_VALUES.PRODUCER_VIEW_ORDERS)}/>
    <PrivateRoute exact path={ROUTERS.PRODUCER_TRACKING_ORDERS_MANAGEMENT} component={ProducerTrackingOrdersPage} isAuthenticated={props.isLogin && props.isProducer && authentication.getPermission(PERMISSION_VALUES.PRODUCER_VIEW_ORDERS)}/>
    <PrivateRoute exact path={ROUTERS.PRODUCER_DETAIL_ORDER_MANAGEMENT} component={ProducerOrderDetailPage} isAuthenticated={props.isLogin && props.isProducer && authentication.getPermission(PERMISSION_VALUES.PRODUCER_ADD_EDIT_ORDER)}/>
    <PrivateRoute exact path={ROUTERS.PRODUCER_WALLET} component={ProducerWalletPage} isAuthenticated={props.isLogin && props.isProducer && authentication.getPermission(PERMISSION_VALUES.PRODUCER_VIEW_WALLET)}/>
    <PrivateRoute exact path={ROUTERS.PRODUCER_MY_ACCOUNT} component={ProducerMyAccountPage} isAuthenticated={props.isLogin}/>
    <PrivateRoute exact path={ROUTERS.NOTIFICATIONS} component={AdminNotificationsPage} isAuthenticated={props.isLogin && props.isProducer}/>
  </Switch>
)

const HelmetMeta = (props) => (
  <Helmet
    titleTemplate={`%s - ${WEBSITE_NAME}`}
    defaultTitle={`${WEBSITE_NAME}`}
  >
    {/*<meta name="description" content="A React.js Boilerplate application" />*/}
  </Helmet>
)

const App = (props) => {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [isLoadedCheckLogin, setIsLoadedCheckLogin] = useState(false);
  const [isLoadedCurrentEvent, setIsLoadedCurrentEvent] = useState(false);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const isProducerMode = props.isProducerMode;
  const isAdminMode = props.isAdminMode;
  const isSellerMode = props.isSellerMode;
  const currentRouter = props.router.location.pathname;
  const isIgnoreRestoreLoginSection = currentRouter.startsWith(ROUTERS.CHANGE_PASSWORD);
  // const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  // const backdropPosition = isMobile ? 40 : 23;
  const redirectTo = path => {
    props.push(path);
  }
  const goBack = () => {
    props.goBack();
  }
  const signOut = () => {
    authentication.clearToken();
    props.setGlobalStore({
      isAdminMode: isAdminMode,
      isProducerMode: isProducerMode,
      isLogin: false,
      isAdmin: false,
      isProducer: false,
      currentUser: {},
    })
    props.push(ROUTERS.ROOT);
  }

  const restoreLoginPreviousSection = () => {
    UserService.getUserInfo(response => {
      authentication.setPermissions(ROLE_PERMISSIONS_VALUES[response.role]);
      const isAdminMode = ADMIN_ROLES.includes(response.role);
      const isProducerMode = PRODUCER_ROLES.includes(response.role);
      props.setGlobalStore({
        isProducerMode: isProducerMode,
        isAdminMode: isAdminMode,
        isLogin: true,
        isAdmin: isAdminMode,
        isProducer: isProducerMode,
        currentUser: {
          ...response,
        }
      })
      if (!isAdminMode && !isProducerMode && (!response.fullName || !response.phone)) {
        props.push(ROUTERS.SELLER_MY_ACCOUNT);
      }
      setIsLoadedCheckLogin(true);
    }, error => {
      setIsLoadedCheckLogin(true);
    })
  }

  const getCurrentEvent = () => {
    FrontUserEventsService.getCurrentEvent((response) => {
      globalStore.set({
        event: response
      });
      setIsLoadedCurrentEvent(true);
    } , () => {
      globalStore.set({
        event: {
          discountPercent: 0
        }
      });
      setIsLoadedCurrentEvent(true);
    });
  }

  const getNewNotifications = ({ isAdminMode, isProducerMode}, isShowSpinner = true) => {
    if (isAdminMode || isProducerMode) {
      AdminNotificationsService.getNotifications({ pageNum: 1, pageSize: 100, status: STATE_VALUES.IS_ACTIVE }, response => {
        setNotificationsCount(response.items.length)
      }, () => {}, isShowSpinner)
    } else {
      SellerNotificationsService.getNotifications({ pageNum: 1, pageSize: 100, status: STATE_VALUES.IS_ACTIVE }, response => {
        setNotificationsCount(response.items.length)
      }, () => {}, isShowSpinner)
    }
  }

  const getSystemConfigs = () => {
    SellerSystemService.getSystemConfigs({}, response => {
      props.setGlobalStore({
        systemConfigs: SellerSystemService.getActivatedSystemConfigs(response.items),
      });
    }, () => {})
  }

  const notAuthorizedListenerFunc = () => {
    let statusListener = null;
    statusListener = events.subscribe("NOT_AUTHORIZE_LISTENER", () => {
      redirectTo(ROUTERS.LOGIN);
    });
    return statusListener;
  }

  const systemConfigsListenerFunc = () => {
    let listener = null;
    listener = events.subscribe("SYSTEM_CONFIGS_LISTENER", () => {
      getSystemConfigs()
    });
    return listener;
  }

  const spinnerListenerFunc = () => {
    let statusListener = null;
    statusListener = events.subscribe("SPINNER_LISTENER", (show = false) => {
      setIsLoadingSpinner(prevShow => prevShow !== show ? show : true);
    });
    return statusListener;
  }

  useEffect(() => {
    let notificationInterval = null;
    getSystemConfigs();
    const notAuthorizedListener = notAuthorizedListenerFunc();
    const systemConfigsListener = systemConfigsListenerFunc();
    if (props.isLogin) {
      getNewNotifications({
        isAdminMode: props.isAdminMode,
        isProducerMode: props.isProducerMode,
      });
      notificationInterval = setInterval(() => {
        getNewNotifications({
          isAdminMode: props.isAdminMode,
          isProducerMode: props.isProducerMode,
        }, false);
      }, 60000);
    }
    return () => {
      notificationInterval && clearInterval(notificationInterval);
      notAuthorizedListener && notAuthorizedListener.remove();
      systemConfigsListener && systemConfigsListener.remove();
    }
    // eslint-disable-next-line
  }, [props.isLogin]);

  useEffect(() => {
    getCurrentEvent();
    const spinnerListener = spinnerListenerFunc();
    if (isIgnoreRestoreLoginSection) {
      setIsLoadedCheckLogin(true);
      return;
    }
    if (isAdminMode || isSellerMode || isProducerMode) {
      restoreLoginPreviousSection();
    }
    return () => {
      spinnerListener && spinnerListener.remove();
    };
    // eslint-disable-next-line
  }, []);
  const selectedRouters = [currentRouter];
  if (((isAdminMode || isSellerMode || isProducerMode) && !isLoadedCheckLogin) || !isLoadedCurrentEvent) return null;


  if (currentRouter.startsWith(ROUTERS.LOGIN) || currentRouter.startsWith(ROUTERS.FORGOT_PASSWORD) || currentRouter.startsWith(ROUTERS.CHANGE_PASSWORD)) {
    return (
      <AppWrapper>
        <HelmetMeta />
        <NormalLayoutWrapper
          // header={<NormalHeader />}
          content={<PublicAppContent />}
        />
        { isLoadingSpinner && <SpinnerBox /> }
      </AppWrapper>
    )
  } else if (isAdminMode) {
    return (
      <AppWrapper>
        <HelmetMeta />
        <LayoutWrapper
          className={`layout__admin-mode ${isMobile && 'layout__admin-mode--mobile'}`}
          header={(
            <Header logoName={WEBSITE_NAME}
                    isLogin={props.isLogin}
                    isAdmin={props.isAdmin}
                    currentUser={props.currentUser}
                    selectedRouters={selectedRouters}
                    redirectTo={redirectTo}
                    goBack={goBack}
                    signOut={signOut}
                    notificationsCount={notificationsCount}
            />
          )}
          sider={<AdminSider selectedRouters={selectedRouters} redirectTo={redirectTo}  systemConfigs={props.systemConfigs}/> }
          content={(<AdminAppContent isLogin={props.isLogin} isAdmin={props.isAdmin} />)}
          // footer={<Footer />}
          router={props.router}
        />
        { isLoadingSpinner && <SpinnerBox /> }
      </AppWrapper>
    )
  }
  else if (isProducerMode) {
    return (
      <AppWrapper>
        <HelmetMeta />
        <LayoutWrapper
          className={`layout__admin-mode ${isMobile && 'layout__admin-mode--mobile'}`}
          header={(
            <Header logoName={WEBSITE_NAME}
                    isLogin={props.isLogin}
                    isProducer={props.isProducer}
                    currentUser={props.currentUser}
                    selectedRouters={selectedRouters}
                    redirectTo={redirectTo}
                    goBack={goBack}
                    signOut={signOut}
                    notificationsCount={notificationsCount}
            />
          )}
          sider={<ProducerSider selectedRouters={selectedRouters} redirectTo={redirectTo} systemConfigs={props.systemConfigs}/>}
          content={(<ProducerAppContent isLogin={props.isLogin} isProducer={props.isProducer} />)}
          footer={<SellerFooter systemConfigs={props.systemConfigs} />}
          router={props.router}
        />
        { isLoadingSpinner && <SpinnerBox /> }
      </AppWrapper>
    )
  }
  if (isSellerMode) {
    return (
      <AppWrapper>
        <HelmetMeta />
        <LayoutWrapper
          className={`layout__seller-mode ${isMobile && 'layout__seller-mode--mobile'}`}
          header={(
            <Header logoName={WEBSITE_NAME}
                    isLogin={props.isLogin}
                    currentUser={props.currentUser}
                    redirectTo={redirectTo}
                    selectedRouters={selectedRouters}
                    goBack={goBack}
                    signOut={signOut}
                    notificationsCount={notificationsCount}
            />
          )}
          sider={<SellerSider selectedRouters={selectedRouters} redirectTo={redirectTo} setGlobalStore={props.setGlobalStore} systemConfigs={props.systemConfigs}/>}
          content={<AppContent isLogin={props.isLogin}/>}
          footer={currentRouter !== ROUTERS.CONTEST && <SellerFooter systemConfigs={props.systemConfigs} />}
          router={props.router}
        />
        { isLoadingSpinner && <SpinnerBox /> }
      </AppWrapper>
    )
  }
  return (
    <AppWrapper>
      <HelmetMeta />
      <GlobalStyles isMobile={isMobile} />
      <PublicLayoutWrapper
        header={(
          <FrontUserHeader
            logoName={WEBSITE_NAME}
            sider={<FrontUserSider selectedRouters={selectedRouters} redirectTo={redirectTo} />}
            redirectTo={redirectTo}
            systemConfigs={props.systemConfigs}
          />
        )}
        content={<FrontUserAppContent />}
        footer={<FrontUserFooter systemConfigs={props.systemConfigs} redirectTo={redirectTo}  />}
        router={props.router}
      />
      { isLoadingSpinner && <SpinnerBox /> }
    </AppWrapper>
  );
}

function mapStateToProps(state) {
  const { isSellerMode, isAdminMode, isProducerMode, isLogin, isAdmin, isProducer, currentUser, products, systemConfigs } = state.global;
  return {
    isSellerMode,
    isAdminMode,
    isProducerMode,
    isLogin,
    isAdmin,
    isProducer,
    currentUser,
    products,
    systemConfigs,
    router: state.router,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGlobalStore: options => dispatch(setGlobalStore(options)),
    push: path => dispatch(push(path)),
    goBack: path => dispatch(goBack()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(App);
