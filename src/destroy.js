import _ from 'lodash';
import { checkConstraints } from '@/constraint';

export default function destroy() {
  const { delete: destroy } = this.client;

  if (_.isUndefined(destroy)) {
    throw new Error('HTTP Client has no `delete` method');
  }

  checkConstraints(this);

  destroy(this.apiPath);
}
