import { Model } from '@vuex-orm/core';
import { installPlugin } from './helpers';

class EntityDummy extends Model {
  static entity = '';
}

class APIPathDummy extends Model {
  static apiPath = '';
}

class Dummy extends Model {
  static entity = 'dummy';
  static apiPath = 'dummyPath';
}

test('Throws error when the client has no get method', () => {
  installPlugin();
  expect(() => { Model.fetch(); }).toThrow('HTTP Client has no `get` method');
});

test('Throws error when no id is provided to fetch', () => {
  const get = jest.fn();
  installPlugin({ get });

  expect(() => {
    Model.fetch();
  }).toThrow('No id is provided');
});

test('Throws error when id is not a number', () => {
  const get = jest.fn();
  installPlugin({ get });

  expect(() => {
    Model.fetch('');
  }).toThrow('The id provided is not a number');
});

test('Throws error when entity name or apiPath is not defined', () => {
  expect(() => {
    EntityDummy.fetch(1);
  }).toThrow("apiPath is not defined on class 'EntityDummy'");

  expect(() => {
    APIPathDummy.fetch(1);
  }).toThrow("entity name is not defined on class 'APIPathDummy'");
});

test('Calls the get method of the client when no constraint is violated', () => {
  const get = jest.fn();
  installPlugin({ get });

  Dummy.fetch(1);
  expect(get).toHaveBeenCalledWith('dummyPath/1');
});
