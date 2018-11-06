import install from '@/install';
import * as components from '@vuex-orm/core';

test('Throws error when client is not defined', () => {
  expect(() => {
    install(components);
  }).toThrow('HTTP-Client is not defined');
});

test('Throws error when router is not defined', () => {
  expect(() => {
    install(components, { client: {} });
  }).toThrow('Router is not defined');
});

test('puts the client on the model prototype', () => {
  install(components, { client: { test: 'test' }, router: {} });
  expect(components.Model.client).toEqual({ test: 'test' });
});

test('puts the router on the model prototype', () => {
  install(components, { client: { test: 'test' }, router: { test: 'test' } });
  expect(components.Model.router).toEqual({ test: 'test' });
});
