import install from '@/install';
import * as components from '@vuex-orm/core';

export function installPlugin(client = {}) {
  install(components, { client });
}
