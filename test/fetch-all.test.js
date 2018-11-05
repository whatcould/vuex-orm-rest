import { Model } from '@vuex-orm/core';
import { installPlugin, createStore, mockResponse } from './helpers';

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
  expect(() => {
    Model.fetchAll();
  }).toThrow('HTTP Client has no `get` method');
});

test('Throws error when entity name or apiPath is not defined', () => {
  const get = jest.fn();
  installPlugin({ get });

  expect(() => {
    EntityDummy.fetchAll();
  }).toThrow("apiPath is not defined on class 'EntityDummy'");

  expect(() => {
    APIPathDummy.fetchAll();
  }).toThrow("entity name is not defined on class 'APIPathDummy'");
});

test('Calls the get method of the client when no constraint is violated', () => {
  const get = jest.fn();
  installPlugin({ get });

  Dummy.fetchAll();
  expect(get).toHaveBeenCalledWith('dummyPath', { params: {} });
});

test('throws error when filter is not an object', () => {
  expect(() => {
    Dummy.fetchAll({ filter: '' });
  }).toThrow('filter needs to be an object')
});

test('passes filter to get request', () => {
  const get = jest.fn();
  installPlugin({ get });

  Dummy.fetchAll({ filter: { search: '' } });
  expect(get).toHaveBeenCalledWith('dummyPath', { params: { search: '' } });
});

test('inserts fetched element in the database', async () => {
  const store = createStore(Dummy);
  const get = jest.fn().mockReturnValue(mockResponse({ id: 1 }));
  installPlugin({ get });
  const response = await Dummy.fetchAll();
  expect(Dummy.find(1)).toEqual({ $id: 1 });
  expect(response).toEqual([{ $id: 1 }]);
})
