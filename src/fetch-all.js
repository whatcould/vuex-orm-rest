import _ from 'lodash';
import { checkConstraints } from '@/constraint';
import joinPath from 'path.join';

export default async function fetchAll({
  filter = {},
  relations = [],
  replace = false,
  useCache = true,
} = {}) {
  const { get } = this.client;
  if(filter.page) {
    this.currentPage = filter.page
  }
  if (_.isUndefined(get)) {
    throw new Error('HTTP Client has no `get` method');
  }

  if (!_.isObject(filter)) {
    throw new Error('Filter needs to be an object');
  }

  checkConstraints(this);

  const self = this;

  function fetchCache() {
    return new Promise((resolve) => {
      const cachedValue = self.all();
      if (cachedValue.length) {
        resolve(cachedValue);
      }
    });
  }

  function fetchAPI() {
    return new Promise(async (resolve, reject) => {
      const path = joinPath(...relations.map(r => r.apiPath()), self.apiPath);
      const data = await get(path, { params: filter });
      try {
        self.totalPages = parseInt(data.headers['total-pages'])
        const insertedData = replace ? await self.create(data) : await self.insertOrUpdate(data);
        resolve(insertedData[self.entity]);
      } catch (error) {
        reject(new Error('Unable to process response.'));
      }
    });
  }

  return Promise.race([
    ...(useCache ? [fetchCache()] : []),
    fetchAPI(),
  ]);
}
