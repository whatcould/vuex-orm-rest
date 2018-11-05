import { Model } from '@vuex-orm/core';
import { installPlugin } from './helpers';

class Dummy extends Model {
  static entity = 'dummy';
  static apiPath = 'dummyPath';

  static fields() {
    return {
      title: this.string(''),
      desc: this.string(''),
    }
  }
}

test('Throws error when the client has no patch method', () => {
  installPlugin();
  const dummy = new Dummy({ $id: 1 });
  expect(() => { dummy.update(); }).toThrow('HTTP Client has no `patch` method');
});

test('Calls patch method of the client', () => {
  const patch = jest.fn();
  installPlugin({ patch });
  const dummy = new Dummy({ $id: 1, title: 'title', desc: 'desc' });
  dummy.update();
  expect(patch).toHaveBeenCalledWith('dummyPath/1', { title: 'title', desc: 'desc' });
});

test('Only updates picked keys', () => {
  const patch = jest.fn();
  installPlugin({ patch });
  const dummy = new Dummy({ $id: 1, title: 'title', desc: 'desc' });
  dummy.update(['title']);
  expect(patch).toHaveBeenCalledWith('dummyPath/1', { title: 'title' });
});
