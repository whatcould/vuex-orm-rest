import joinPath from 'path.join';

export default function apiPath() {
  return joinPath(this.constructor.apiPath, this.$id.toString());
}
