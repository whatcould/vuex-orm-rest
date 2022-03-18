import _ from 'lodash';
import { checkConstraints } from '@/constraint';

export default async function update(keys = Object.keys(this.$toJson()), updateFromResponse = false) {
  const { patch } = this.client;

  if (_.isUndefined(patch)) {
    throw new Error('HTTP Client has no `patch` method');
  }

  checkConstraints(this);
  const { data } = await patch(this.apiPath(), this.nestParams(this.pickKeys(keys)));
  if(updateFromResponse) {
    let updateData = Array.isArray(updateFromResponse) ? _.pick(data, ['id'].concat(updateFromResponse)) : data
    const stored = await this.$update(updateData);
    return stored[this.constructor.entity][0];
  }
  return this
}
