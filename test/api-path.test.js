import { Model } from '@vuex-orm/core';
import { installPlugin } from './helpers';

class Dummy extends Model {
  static entity = 'dummy';
  static apiPath = 'dummyPath';
}

test('Generates path with id', () => {
  installPlugin();

  const dummy = new Dummy({ $id: 1 });

  expect(dummy.apiPath).toBe('dummyPath/1');
});
