let map, layer1, layer2
let cursors, pathKey, escKey, bioKey, solarKey, massKey
let marker, selectedStructure, panel
let currentTile = { x: 0, y: 0 }

import GameMap from '../entities/map'
import UserInterface from '../entities/interface'

export default {
  create(game) {
    game.stage.backgroundColor = '#2d2d2d'
    game.gameMap = new GameMap(game, 64, 49)
    game.interface = new UserInterface(game, 64)

    game.camera.x = game.world.width/2 - game.width/2
    game.camera.y = game.world.height/2 - game.height/2
  },

  update(game) {
    game.interface.update()
  },

  render(game) {
    game.debug.text(`x: ${game.interface.currentTile.x}, y: ${game.interface.currentTile.y}`, 16, 350);
  }
}
