import { structure, typeLabel } from '../data'

export default class Structure {
  constructor(game, tile) {
    this.game = game
    this.tile = tile
    this.x = tile.x
    this.y = tile.y
    this.index = tile.index
    this.label = typeLabel[tile.index]
    this.massCost = structure[this.label].mass
    this.energyCost = structure[this.label].energy
  }
}
