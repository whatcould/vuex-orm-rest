import _ from 'lodash';
import { checkConstraints } from '@/constraint';

export default function update(keys = Object.keys(this.$toJson())) {
  const { patch } = this.client;

  if (_.isUndefined(patch)) {
    throw new Error('HTTP Client has no `patch` method');
  }

  checkConstraints(this);

  patch(this.apiPath, _.omit(_.pick(this.$toJson(), keys), '$id'));
}
