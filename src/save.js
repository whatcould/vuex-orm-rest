import _ from 'lodash';
import { checkConstraints } from '@/constraint';

export default async function save(keys = Object.keys(this.$toJson())) {
  if(this.id.indexOf('$uid') === -1) {
    return this.update(keys)
  }
  const { post } = this.client;

  if (_.isUndefined(post)) {
    throw new Error('HTTP Client has no `post` method');
  }

  checkConstraints(this);

  const data = await post(this.constructor.apiPath, this.pickKeys(keys));
  const stored = await this.$insert(data);
  return stored[this.constructor.entity][0];
}
