import { getFrontUserBaseURL } from 'services/BaseService';
import { makeGetWithConfigs } from 'utils';

function getCurrentEvent(successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/events/current';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getCurrentEvent,
}
