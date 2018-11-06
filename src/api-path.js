import { checkEntityName } from '@/constraint';
import joinPath from 'path.join';

export default function apiPath() {
  checkEntityName(this.constructor);

  return joinPath(this.constructor.apiPath, this.$id.toString());
}
