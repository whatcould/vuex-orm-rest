import _ from 'lodash';
import { checkConstraints } from '@/constraint';

// saving a null relation causes an error in vuex-orm
function cleanNulls(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj
}

export default async function save(keys = Object.keys(this.$toJson())) {
  if(this.$id && this.$id.indexOf('$uid') === -1) {
    return this.update(keys)
  }

  const { post } = this.client;

  if (_.isUndefined(post)) {
    throw new Error('HTTP Client has no `post` method');
  }

  checkConstraints(this);

  const data = await post(this.constructor.apiPath, this.nestParams(this.pickKeys(keys)));
  let updateWithId = Object.assign(this.$toJson(), {id: data.data.id})
  const stored = await this.$insert({data: cleanNulls(updateWithId)});
  return stored[this.constructor.entity][0];
}
