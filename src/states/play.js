import GameMap from '../entities/map'
import UserInterface from '../entities/interface'
import { get, set } from '../utils'

let map, layer1, layer2
let cursors, pathKey, escKey, bioKey, solarKey, massKey
let marker, selectedStructure, panel
let currentTile = { x: 0, y: 0 }

export default {
  create(game) {
    game.stage.backgroundColor = '#2d2d2d'

    game.getResource = get('resource', 0)
    game.setResource = set('resource')
    game.getStructure = get('structure', [])
    game.setStructure = set('structure')

    game.setResource('energy', 1000)
    game.setResource('mass', 10)

    game.gameMap = new GameMap(game, 64, 49)
    game.interface = new UserInterface(game, 64)

    game.camera.x = game.world.width/2 - game.width/2
    game.camera.y = game.world.height/2 - game.height/2
  },

  update(game) {
    game.interface.update()
  },

  render(game) {
    game.debug.text(`energy: ${game.getResource('energy').toFixed(2)}, mass: ${game.getResource('mass').toFixed(2)}`, 16, 350);
    if (game.interface.selectedStructure.alpha > 0) {
      game.debug.text(`placing: ${game.interface.selectedStructure.frame}`, 16, 390);
      // game.debug.text(`x: ${game.interface.currentTile.x}, y: ${game.interface.currentTile.y}`, 16, 420);
    } else if (game.interface.currentTile) {
      let tile = game.interface.currentTile
      game.debug.text(`selected: ${tile.index}`, 16, 390);
      game.debug.text(`x: ${tile.x}, y: ${tile.y}`, 16, 420);
      game.debug.text(`energy: ${tile.structure.energyCost}, mass ${tile.structure.massCost}`, 16, 450);
    }
  }
}
