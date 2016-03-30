import { structureCosts } from '../utils'

export default class Structure {
  constructor(game, tile, type) {
    this.game = game
    this.tile = tile
    this.x = tile.x
    this.y = tile.y
    this.index = tile.index
    this.type = type
    this.massCost = structureCosts[type].mass
    this.energyCost = structureCosts[type].energy
  }
}
