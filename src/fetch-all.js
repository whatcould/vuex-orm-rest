import _ from 'lodash';
import { checkConstraints } from '@/constraint';
import joinPath from 'path.join';

export default function fetchAll({ filter = {}, relations = [] } = {}) {
  const { get } = this.client;

  if (_.isUndefined(get)) {
    throw new Error('HTTP Client has no `get` method');
  }

  if (!_.isObject(filter)) {
    throw new Error('filter needs to be an object');
  }

  checkConstraints(this);

  const path = joinPath(...relations.map(r => r.apiPath), this.apiPath);
  return get(path, { params: filter });
}
