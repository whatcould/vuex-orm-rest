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
  expect(() => { dummy.destroy(); }).toThrow('HTTP Client has no `delete` method');
});

test('Calls delete method of the client', () => {
  const destroy = jest.fn();
  installPlugin({ delete: destroy });
  const dummy = new Dummy({ $id: 1, title: 'title', desc: 'desc' });
  dummy.destroy();
  expect(destroy).toHaveBeenCalledWith('dummyPath/1');
});
