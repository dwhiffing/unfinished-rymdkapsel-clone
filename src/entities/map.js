let map, layer1, layer2

export default class GameMap {
  constructor(game, tileSize, worldSize) {
    this.game = game
    this.map = game.add.tilemap(null, tileSize, tileSize)
    this.map.addTilesetImage('rock')

    this.groundLayer = this.map.create('level1', worldSize, worldSize, tileSize, tileSize)
    this.groundLayer.resizeWorld()

    this.structureLayer = this.map.createBlankLayer('level2', worldSize, worldSize, tileSize, tileSize)

    this.map.fill(0, 0, 0, worldSize, worldSize, this.groundLayer)
    this.map.fill(7, Math.floor(worldSize/2), Math.floor(worldSize/2), 1, 1, this.structureLayer)
  }
}
