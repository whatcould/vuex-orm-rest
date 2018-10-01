import _ from 'lodash';
import { checkConstraints } from '@/constraint';

export default function fetchAll(filter = {}) {
  const { get } = this.client;

  if (_.isUndefined(get)) {
    throw new Error('HTTP Client has no `get` method');
  }

  if (!_.isObject(filter)) {
    throw new Error('filter needs to be an object');
  }

  checkConstraints(this);

  const path = this.apiPath;
  get(path, { params: filter });
}
