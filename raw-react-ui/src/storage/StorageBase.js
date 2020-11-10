import Cookies from "universal-cookie";

export default class StorageBase {
  name;

  cookies;

  constructor(name) {
    this.name = name;
    this.cookies = new Cookies();
  }

  set(value, options = {}) {
    this.cookies.set(this.name, value, options);
  }

  get() {
    return this.cookies.get(this.name);
  }

  clear() {
    this.cookies.remove(this.name);
  }
}
