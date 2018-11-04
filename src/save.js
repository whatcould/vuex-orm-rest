import _ from 'lodash';
import { checkConstraints } from '@/constraint';

export default function save(keys = Object.keys(this.$toJson())) {
  const { post } = this.client;

  if (_.isUndefined(post)) {
    throw new Error('HTTP Client has no `post` method');
  }

  checkConstraints(this);

  post(this.constructor.apiPath, _.omit(_.pick(this.$toJson(), keys), '$id'));
}
