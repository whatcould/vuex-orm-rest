import _ from 'lodash';
import fetch from '@/fetch';
import fetchAll from '@/fetch-all';
import apiPath from '@/api-path';
import save from '@/save';
import update from '@/update';
import replace from '@/replace';
import destroy from '@/destroy';

/* eslint-disable no-param-reassign */
export default function install({ Model }, { client } = {}) {
  // REST Client needs to be installed to make http requests
  if (_.isUndefined(client)) {
    throw new Error('HTTP-Client is not defined');
  } else {
    Model.prototype.client = client;
    Model.client = client;
  }

  Model.fetch = fetch;
  Model.fetchAll = fetchAll;
  Object.defineProperty(Model.prototype, 'apiPath', {
    get: apiPath,
  });
  Model.prototype.save = save;
  Model.prototype.update = update;
  Model.prototype.replace = replace;
  Model.prototype.destroy = destroy;
}
/* eslint-enable no-param-reassign */
