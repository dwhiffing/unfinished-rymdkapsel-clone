const store = {}

export const typeLabel = {
  6: 'path',
  7: 'center',
  8: 'bio',
  9: 'energy',
  10: 'mass',
}

export const structure = {
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
