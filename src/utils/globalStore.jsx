class GlobalStore {
  set(option = {}) {
    this.globalStore = {
      ...option
    };
  }

  get() {
    return this.globalStore;
  }
}

const globalStore = new GlobalStore();

export default globalStore;
