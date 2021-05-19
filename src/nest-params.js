
export default function nestParams(data = {}) {
  if(this.constructor.parentParam) {
    return {[this.constructor.parentParam]: data};
  }
  else {
    return data;
  }
}
