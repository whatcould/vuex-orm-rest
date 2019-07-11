import { Model } from '@vuex-orm/core';
import { installPlugin, createStore, deferResponse } from './helpers';

class Dummy extends Model {
  static entity = 'dummy';
  static apiPath = 'dummyPath';

  static fields() {
    return {
      number: this.attr(null),
    }
  }
}

test('caches entity when fetching a single item', async (done) => {
  const store = createStore(Dummy);
  const { mock : get, resolve, reload } = deferResponse({ id: 1 });
  installPlugin({ get });

  const requestToServer = Dummy.fetch(1);
  expect(get).toHaveBeenCalledTimes(1);

  // Item should not be in the store
  expect(Dummy.find(1)).toBeNull();

  resolve({ id: 1, number: 1 });
  await requestToServer;
  // Item should be in the store
  expect(Dummy.find(1)).toEqual({ $id: 1, number: 1 });
  expect(get).toHaveBeenCalledTimes(1);

  reload();

  await Dummy.fetch(1);
  // Item should still be in the store
  expect(Dummy.find(1)).toEqual({ $id: 1, number: 1 });

  // Watch the store for when the item is updated
  Dummy.store().subscribe(({ type }) => {
    // Item should be updated in the background
    if (type === 'entities/commitUpdate') {
      expect(Dummy.find(1)).toEqual({ $id: 1, number: 2 });
      expect(get).toHaveBeenCalledTimes(2);
      done();
    }
  });

  resolve({ id: 1, number: 2 });
});
