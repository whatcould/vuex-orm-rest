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
  expect(Model.fetch()).rejects.toEqual(new Error('HTTP Client has no `get` method'));
});

test('Throws error when no id is provided to fetch', () => {
  const get = jest.fn();
  installPlugin({ get });

  expect(Model.fetch()).rejects.toEqual(new Error('No id is provided'));
});

test('Throws error when id is not a number', () => {
  const get = jest.fn();
  installPlugin({ get });

  expect(Model.fetch('')).rejects.toEqual(new Error('The id provided is not a number'));
});

test('Throws error when entity name or apiPath is not defined', () => {
  expect(EntityDummy.fetch(1)).rejects.toEqual(new Error("apiPath is not defined on class 'EntityDummy'"));
  expect(APIPathDummy.fetch(1)).rejects.toEqual(new Error("entity name is not defined on class 'APIPathDummy'"));
});

test('Calls the get method of the client when no constraint is violated', async () => {
  const store = createStore(Dummy);
  const get = mockResponse({ id: 1 });
  installPlugin({ get });

  await Dummy.fetch(1);
  expect(get).toHaveBeenCalledWith('dummyPath/1');
});

test('inserts fetched element in the database', async () => {
  const store = createStore(Dummy);
  const get = mockResponse({ id: 1 });
  installPlugin({ get });
  const response = await Dummy.fetch(1);
  expect(Dummy.find(1)).toEqual({ $id: 1 });
  expect(response).toEqual({ $id: 1 });
});

test('throws error when response could not be processed', () => {
  const store = createStore(Dummy);
  const get = mockResponse({});
  installPlugin({ get });
  expect(Dummy.fetch(1)).rejects.toEqual(new Error('Unable to process response.'))
});
