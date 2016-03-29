import Structure from './structure'
import { typeLabel } from '../utils'
let map, layer1, layer2, store = {}

export default class GameMap {
  constructor(game, tileSize, worldSize) {
    this.game = game
    this.map = game.add.tilemap(null, tileSize, tileSize)
    this.map.addTilesetImage('rock')

    this.groundLayer = this.map.create('level1', worldSize, worldSize, tileSize, tileSize)
    this.groundLayer.resizeWorld()

    this.structureLayer = this.map.createBlankLayer('level2', worldSize, worldSize, tileSize, tileSize)

    this.map.fill(0, 0, 0, worldSize, worldSize, this.groundLayer)
    this.placeStructure((worldSize*tileSize)/2, (worldSize*tileSize)/2, 7)
    setInterval(this.update.bind(this), 500)
  }
  getTileXY(x, y) {
    return {
      x: this.groundLayer.getTileX(x),
      y: this.groundLayer.getTileY(y),
    }
  }
  getTile(x, y) {
    const tile = this.map.getTile(x, y, this.structureLayer, true)
    if (tile.index === -1) {
      return null
    }
    return tile
  }
  placeStructure(worldX, worldY, type) {
    let {x, y} = this.getTileXY(worldX, worldY)
    let tile = this.getTile(x, y)
    if (!tile) {
      this.map.putTile(
        type,
        this.structureLayer.getTileX(worldX),
        this.structureLayer.getTileY(worldY),
        this.structureLayer
      )
      const tile = this.map.getTile(x, y, this.structureLayer, true)
      let structure = new Structure(this.game, tile, typeLabel[type])
      let thing = this.game.getStructure(typeLabel[type]).concat([structure])
      this.game.setStructure(typeLabel[type], thing)
      tile.structure = structure
    }
  }
  update() {
    const currentEnergy = this.game.getResource('energy')
    const currentMass = this.game.getResource('mass')
    const energyInc = this.game.getStructure('energy').length + this.game.getStructure('center').length * 0.5
    const massInc = this.game.getStructure('mass').length * 0.1 + this.game.getStructure('center').length * 0.05
    this.game.setResource('energy', currentEnergy + energyInc)
    this.game.setResource('mass', currentMass + massInc)
  }
}
