import { datetime, makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { getFrontUserBaseURL, getFullPathImage } from '../BaseService';
import { DATETIME_FORMAT } from 'components/contants';

function login(data, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/users/authenticate';
  const { userName:username, ...rest } = data;
  const config = {
    data: {
      ...rest,
      username,
    }
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function register(data, successCallback, failureCallback) {
  const { userName:username, phoneNumber: phone, ...rest } = data;
  const url = getFrontUserBaseURL() + '/users/register';
  const config = {
    data: {
      ...rest,
      phone,
      username,
    }
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function forgotPassword(params, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/users/forgot';
  const config = {
    params
  };
  makeGetWithConfigs(url, config, successCallback, failureCallback)
}
function changePassword(data, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/users/reset-pass';
  const config = {
    data
  };
  makePutWithConfigs(url, config, successCallback, failureCallback)
}

const transformUser = item => {
  const convertedAvatarImages = (!!item.avatar ? [item.avatar] : []).map(image => ({
    url: getFullPathImage(image),
    existing: true,
  }));
  return {
    ...item,
    convertedAvatar: getFullPathImage(item.avatar),
    convertedLastLogin: datetime.convert(!!item.lastLogin ? item.lastLogin : new Date(), DATETIME_FORMAT),
    convertedAvatarImages
  }
}
function getUserInfo(successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/users/me';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, response => {
    return transformUser(response);
  })
}

function getUploadImageUrl() {
  return getFrontUserBaseURL() + '/files/images';
}

function deleteImage(path, successCallback, failureCallback) {
  const config = {
    params: {
      path
    }
  }
  const url = getFrontUserBaseURL() + '/files/images/';
  makeDeleteWithConfigs(url, config, successCallback, failureCallback);
}

export {
  login,
  register,
  getUserInfo,
  forgotPassword,
  changePassword,
  getUploadImageUrl,
  deleteImage,
  transformUser,
}
