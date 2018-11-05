import { Model } from '@vuex-orm/core';
import { installPlugin, mockResponse } from './helpers';

class Dummy extends Model {
  static entity = 'dummy';
  static apiPath = 'dummyPath';
}

class RelationA extends Model {
  static entity = 'dummyrelationA';
  static apiPath = 'dummyRelationPathA';
}

class RelationB extends Model {
  static entity = 'dummyrelationB';
  static apiPath = 'dummyRelationPathB';
}

test('Calls the get method with relations when no constraint is violated', () => {
  const get = mockResponse({ id: 1 });
  installPlugin({ get });

  const relation = new RelationA({ $id: 1 });

  Dummy.fetchAll({ relations: [relation] });
  expect(get).toHaveBeenCalledWith('dummyRelationPathA/1/dummyPath', { params: {} });
});

test('Calls the get method with multiple relations', () => {
  const get = mockResponse({ id: 1 });
  installPlugin({ get });

  const relationA = new RelationA({ $id: 1 });
  const relationB = new RelationB({ $id: 2 });

  Dummy.fetchAll({ relations: [relationA, relationB] });
  expect(get)
    .toHaveBeenCalledWith('dummyRelationPathA/1/dummyRelationPathB/2/dummyPath', { params: {} });
});
