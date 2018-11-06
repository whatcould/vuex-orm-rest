import _ from 'lodash';
import { checkEntityName } from '@/constraint';

export function routeURL(type) {
  checkEntityName(this.constructor);

  if (_.isUndefined(this.$id)) {
    throw new Error(`Unable to generate route URL. No id defined for '${this.constructor.entity}'.`);
  }

  return {
    name: [type, this.constructor.routeName].join('-'),
    params: {
      id: this.$id,
    },
  };
}

export function showURL() {
  return this.routeURL('show');
}

export function editURL() {
  return this.routeURL('edit');
}
