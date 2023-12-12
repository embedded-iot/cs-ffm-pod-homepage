const getBaseURL = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API;
  return baseUrl + '/api/v1';
}

const getFrontUserUrl = () => {
  return process.env.NEXT_PUBLIC_FE;
}

const getSellerUrl = () => {
  return process.env.NEXT_PUBLIC_SELLER_FE;
}

const getAdminUrl = () => {
  return process.env.NEXT_PUBLIC_ADMIN_FE;
}

const getFrontUserBaseURL = () => {
  return getBaseURL() + '/public';
}

const getSellerBaseURL = () => {
  return getBaseURL() + '/reseller';
}

const getAdminBaseURL = () => {
  return getBaseURL() + '/admin';
}

const getProducerBaseURL = () => {
  return getBaseURL() + '/producer';
}

const getErrorMessage = (error, defaultMessage) => {
  const message = !!error && !!error.errors && Object.entries(error.errors).map(([key, value]) => `[${key.toUpperCase()}]: ${value}`).join(',');
  if (!!message) {
    return message;
  }
  if (!!error && error.message ) {
    return error.message;
  }
  return defaultMessage;
}

const getFullPathImage = (imageUrl = '') => !!imageUrl && !imageUrl.startsWith('http') ? (getFrontUserUrl() + imageUrl) : imageUrl;
const getShortPathImage = (imageUrl = '') => !!imageUrl && imageUrl.startsWith(getFrontUserUrl()) ? imageUrl.replace(getFrontUserUrl(),'') : imageUrl;

const filterListByPermission = (list = [], filterKey = 'permission') => {
  return list.filter(item => item[filterKey] === undefined || item[filterKey] === true);
}

export {
  getFrontUserUrl,
  getSellerUrl,
  getAdminUrl,
  getFullPathImage,
  getShortPathImage,
  getBaseURL,
  getFrontUserBaseURL,
  getSellerBaseURL,
  getAdminBaseURL,
  getProducerBaseURL,
  getErrorMessage,
  filterListByPermission,
}
