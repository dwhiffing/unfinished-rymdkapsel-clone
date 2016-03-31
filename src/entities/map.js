import Structure from './structure'
import PF from 'pathfinding'
let map, layer1, layer2, store = {}

export default class GameMap {
  constructor(game, tileSize, worldSize) {
    this.game = game
    this.map = game.add.tilemap(null, tileSize, tileSize)
    this.map.addTilesetImage('rock')
    this.worldSize = worldSize

    this.groundLayer = this.map.create('level1', worldSize, worldSize, tileSize, tileSize)
    this.groundLayer.resizeWorld()

    this.structureLayer = this.map.createBlankLayer('level2', worldSize, worldSize, tileSize, tileSize)

    this.map.fill(0, 0, 0, worldSize, worldSize, this.groundLayer)
    this.placeStructure((worldSize*tileSize)/2, (worldSize*tileSize)/2, 7)
    this.finder = new PF.AStarFinder()
    this.createGrid()
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
  getPath(one, two) {
    return this.finder.findPath(one.x, one.y, two.x, two.y, this.grid)
  }
  isOccupied({x, y}) {
    const tile = this.getTile(x, y)
    return !!tile
  }
  isConnectedToCenter(tile) {
    this.grid.setWalkableAt(tile.x, tile.y, true)
    const thing = this.getPath({x:12, y:12}, tile)
    this.grid.setWalkableAt(tile.x, tile.y, false)
    this.createGrid()
    return thing.length > 0
  }
  createGrid() {
    let matrix = []
    this.map.forEach((t) => {
      if (typeof t.index === 'undefined') return
      if (!matrix[t.y]) {
        matrix[t.y] = []
      }
      if (t.index === 6 || t.index === 7) {
        matrix[t.y].push(0)
      } else {
        matrix[t.y].push(1)
      }
    })
    this.grid = new PF.Grid(matrix)
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
      let structure = new Structure(this.game, tile)
      let thing = this.game.getStructure(structure.label).concat([structure])
      this.game.setStructure(structure.label, thing)
      tile.structure = structure
      this.createGrid()
    }
  }
}
