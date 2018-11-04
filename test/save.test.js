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

test('Throws error when the client has no post method', () => {
  installPlugin();
  const dummy = new Dummy({ $id: 1 });
  expect(() => { dummy.save(); }).toThrow('HTTP Client has no `post` method');
});

test('Calls post method of the client', () => {
  const post = jest.fn();
  installPlugin({ post });
  const dummy = new Dummy({ $id: 1, title: 'title', desc: 'desc' });
  dummy.save();
  expect(post).toHaveBeenCalledWith('dummyPath', { title: 'title', desc: 'desc' });
});

test('Only saves picked keys', () => {
  const post = jest.fn();
  installPlugin({ post });
  const dummy = new Dummy({ $id: 1, title: 'title', desc: 'desc' });
  dummy.save(['title']);
  expect(post).toHaveBeenCalledWith('dummyPath', { title: 'title' });
});
