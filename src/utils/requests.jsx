import axios from 'axios';
import events from './events';

const requestCounts = {
  value: 0
}

const defaultShowSpinner = false;

function request({ isShowSpinner = defaultShowSpinner, ...configs} = {}, successCallback = () => {}, failCallback = () => {}, transformFunc = (response) => response) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }
  const requestConfigs = {
    ...configs,
    headers: {
      ...defaultHeaders,
      ...(configs.headers || {})
    }
  }
  if (isShowSpinner) {
    requestCounts.value++;
    events.publish("SPINNER_LISTENER", !!requestCounts.value);
  }
  return axios.request(requestConfigs)
    .then(response => {
      if (response.status === 204 || response.status === 205) {
        successCallback(null);
      } else {
        successCallback(transformFunc(response.data));
      }
    })
    .catch(error => {
      if (error.response && (error.response.status === 401)) {
        events.publish("NOT_AUTHORIZE_LISTENER");
      }
      error.response && error.response.data ? failCallback(error.response.data) : failCallback(null);
    }).finally(() => {
      if (isShowSpinner) {
        requestCounts.value--;
        events.publish("SPINNER_LISTENER", !!requestCounts.value);
      }
    })
}

function makeGetWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}, transformFunc = (response) => response) {
  const requestConfigs = {
    method: 'get',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback, transformFunc);
}

function makePostWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}, transformFunc = (response) => response) {
  const requestConfigs = {
    method: 'post',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback, transformFunc);
}

function makePutWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}, transformFunc = (response) => response) {
  const requestConfigs = {
    method: 'put',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback, transformFunc);
}

function makePatchWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}, transformFunc = (response) => response) {
  const requestConfigs = {
    method: 'patch',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback, transformFunc);
}

function makeDeleteWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}, transformFunc = (response) => response) {
  const requestConfigs = {
    method: 'delete',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback, transformFunc);
}

function download(url, target = '_blank') {
  window.open(url, target);
}


function downloadFile(data, fileName) {
  // create file link in browser's memory
  const href = URL.createObjectURL(data);
  // create "a" HTML element with href to file & click
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', fileName); //or any other extension
  document.body.appendChild(link);
  link.click();
  // clean up "a" element & remove ObjectURLN
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}

export {
  makeGetWithConfigs,
  makePostWithConfigs,
  makePutWithConfigs,
  makeDeleteWithConfigs,
  makePatchWithConfigs,
  download,
  downloadFile,
}
