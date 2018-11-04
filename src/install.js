import _ from 'lodash';
import fetch from '@/fetch';
import fetchAll from '@/fetch-all';
import apiPath from '@/api-path';

/* eslint-disable no-param-reassign */
export default function install({ Model }, { client } = {}) {
  // REST Client needs to be installed to make http requests
  if (_.isUndefined(client)) {
    throw new Error('HTTP-Client is not defined');
  } else {
    Model.client = client;
  }

  Model.fetch = fetch;
  Model.fetchAll = fetchAll;
  Object.defineProperty(Model.prototype, 'apiPath', {
    get: apiPath,
  });
}
/* eslint-enable no-param-reassign */
