import _ from 'lodash';
import { checkConstraints } from '@/constraint';
import joinPath from 'path.join';

export default function fetch(id) {
  const { get } = this.client;

  if (_.isUndefined(get)) {
    throw new Error('HTTP Client has no `get` method');
  }

  if (_.isUndefined(id)) {
    throw new Error('No id is provided');
  }

  if (!_.isNumber(id)) {
    throw new Error('The id provided is not a number');
  }

  checkConstraints(this);

  const path = joinPath(this.apiPath, id.toString());
  get(path);
}
