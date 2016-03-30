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
    mass: 1,
    energy: 10,
  },
  center: {
    mass: 500,
    energy: 1000,
  },
  bio: {
    mass: 50,
    energy: 100,
  },
  energy: {
    mass: 5,
    energy: 100,
  },
  mass: {
    mass: 2,
    energy: 50,
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
