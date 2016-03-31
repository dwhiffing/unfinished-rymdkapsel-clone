const store = {}
const perSecond = {
  energy: {
    path: 0,
    bio: 0,
    mass: 0,
    center: 5,
    energy: 1,
  },
  mass: {
    path: 0,
    bio: 0,
    energy: 0,
    center: 0.05,
    mass: 0.2,
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

export const getPerSecond = (game, label) => {
  const thing = perSecond[label]
  let count = 0
  Object.keys(thing).forEach(key => {
    const value = thing[key]
    if (value === 0) return
    count += game.getStructure(key).length * value
  })
  return count
}
