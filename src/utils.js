const store = {}

export const typeLabel = {
  6: 'path',
  7: 'center',
  8: 'bio',
  9: 'energy',
  10: 'mass',
}

export const structureCosts = {
  path: {
    metal: 2,
    energy: 10,
  },
  center: {
    metal: 100,
    energy: 1000,
  },
  bio: {
    metal: 20,
    energy: 100,
  },
  energy: {
    metal: 10,
    energy: 100,
  },
  mass: {
    metal: 30,
    energy: 1000,
  },
}

export const get = (context, defaultValue) => {
  store[context] = {}
  return (key) => {
    if (!store[context][key]) {
      store[context][key] = defaultValue
    }
    return store[context][key]
  }
}
export const set = (context) => {
  store[context] = {}
  return (key, value) => {
    return store[context][key] = value
  }
}
