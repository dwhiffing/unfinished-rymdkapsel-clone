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
    this.placeStructure((worldSize*tileSize)/2, (worldSize*tileSize)/2, 7, true)
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
  getPath(one, two, markTwo, includeQueued) {
    // if (includeQueued) {
    //   this.createGrid(true)
    // } else {
    //   this.createGrid()
    // }
    if (markTwo) {
      this.grid.setWalkableAt(one.x, one.y, true)
      this.grid.setWalkableAt(two.x, two.y, true)
    }
    let path = this.finder.findPath(one.x, one.y, two.x, two.y, this.grid)
    if (markTwo) {
      this.grid.setWalkableAt(one.x, one.y, false)
      this.grid.setWalkableAt(two.x, two.y, false)
    }
    this.createGrid()
    return path
  }
  isOccupied({x, y}) {
    const tile = this.getTile(x, y)
    return !!tile
  }
  isConnectedToCenter(tile) {
    const setWalkable = tile.type === 6 || tile.type === 7
    // const path = this.getPath({x:12, y:12}, tile, setWalkable, true)
    const path = this.getPath({x:12, y:12}, tile, true)
    return path.length > 0
  }
  createGrid(includeQueued=true) {
    let matrix = []
    this.map.forEach((t) => {
      if (typeof t.index === 'undefined') return
      if (!matrix[t.y]) {
        matrix[t.y] = []
      }
      const walkable  = t.index === 6 || t.index === 7
      const markAsWalkable = includeQueued ? (walkable && t.alpha === 1) : walkable
      if (markAsWalkable) {
        matrix[t.y].push(0)
      } else {
        matrix[t.y].push(1)
      }
    })
    this.grid = new PF.Grid(matrix)
  }
  completeStructure(x, y) {
    let tile = this.getTile(x, y, this.structureLayer, true)
    tile.alpha = 1
    this.map.putTile( tile.type, x, y, this.structureLayer )
    let structure = new Structure(this.game, tile)
    let thing = this.game.getStructure(structure.label).concat([structure])
    this.game.setStructure(structure.label, thing)
    tile.structure = structure
  }
  placeStructure(worldX, worldY, type, autoComplete) {
    let {x, y} = this.getTileXY(worldX, worldY)
    let tile = this.getTile(x, y)
    if (!tile) {
      this.map.putTile( type, x, y, this.structureLayer )
      const tile = this.map.getTile(x, y, this.structureLayer, true)
      tile.type = type
      tile.alpha = 0.5
      if (autoComplete) {
        this.completeStructure(x, y)
      } else {
        this.game.colonists.queue('structure', x, y, () => {
          this.completeStructure(x, y)
        })
      }
      this.createGrid()
    }
  }
}
