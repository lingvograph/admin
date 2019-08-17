class TokenStore {
  listeners = [];

  get value() {
    return localStorage.getItem('access_token');
  }

  set value(token) {
    if (this.value === token) {
      return;
    }
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }

    for (let i = 0; i < this.listeners.length; i++) {
      const listener = this.listeners[i];
      listener(token);
    }
  }

  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    let isSubscribed = true;

    this.listeners.push(listener);

    return () => {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      const index = this.listeners.indexOf(listener);
      this.listeners.splice(index, 1);
    };
  }
}

const store = new TokenStore();

export default store;
