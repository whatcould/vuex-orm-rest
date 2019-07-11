import install from '@/install';
import * as components from '@vuex-orm/core';
import Vuex from 'vuex';
import Vue from 'vue';
import VuexORM, { Database } from '@vuex-orm/core';

Vue.use(Vuex);

export function installPlugin(client = {}) {
  install(components, { client });
}

export function createStore(...entities) {
  const database = new Database();

  entities.forEach(entity => database.register(entity, {}));

  return new Vuex.Store({
    plugins: [VuexORM.install(database)],
    strict: true,
  });
}

export function mockResponse(data) {
  return jest.fn().mockReturnValue(Promise.resolve({ data }));
}

export function deferResponse() {
  let resolve = null;
  const mock = jest.fn();

  function implementMock() {
    const promise = new Promise((r) => { resolve = r; });
    mock.mockReturnValue(promise);
  }

  implementMock();

  return {
    mock,
    resolve: data => resolve({ data }),
    reload: implementMock,
  };
}
