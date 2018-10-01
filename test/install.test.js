import install from '@/install';
import * as components from '@vuex-orm/core';

test('Throws error when client is not defined', () => {
  expect(() => {
    install(components);
  }).toThrow('HTTP-Client is not defined');

  expect(() => {
    install(components, { some: '' });
  }).toThrow('HTTP-Client is not defined');

  expect(install(components, { client: {} })).toBeUndefined();
});

test('puts the client on the model prototype', () => {
  install(components, { client: { test: 'test' } });
  expect(components.Model.client).toEqual({ test: 'test' });
});
