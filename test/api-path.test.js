import { Model } from '@vuex-orm/core';
import { installPlugin } from './helpers';

class Dummy extends Model {
  static entity = 'dummy';
  static apiPath = 'dummyPath';
}

class EmptyDummy extends Model {}

test('Throws error when no entity name is defined', () => {
  installPlugin();

  const emptyDummy = new EmptyDummy({ $id: 1 });

  expect(() => { emptyDummy.apiPath(); }).toThrow("entity name is not defined on class 'EmptyDummy'");
});

test('Generates path with id', () => {
  installPlugin();

  const dummy = new Dummy({ $id: 1 });

  expect(dummy.apiPath()).toBe('dummyPath/1');
});
