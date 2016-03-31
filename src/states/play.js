import GameMap from '../entities/map'
import UserInterface from '../entities/interface'
import { get, set } from '../utils'
import { getPerSecond } from '../utils'

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

    game.gameMap = new GameMap(game, 64, 25)
    game.interface = new UserInterface(game, 64)

    game.camera.x = game.world.width/2 - game.width/2
    game.camera.y = game.world.height/2 - game.height/2
    setInterval(this.updateResources.bind(this, game), 500)
  },

  update(game) {
    game.interface.update()
  },

  updateResources(game) {
    game.setResource('energy', game.getResource('energy') + getPerSecond(game, 'energy'))
    game.setResource('mass', game.getResource('mass') + getPerSecond(game, 'mass'))
  },

  render(game) {
    game.debug.text(`energy: ${game.getResource('energy')}, mass: ${game.getResource('mass').toFixed(2)}`, 16, 350);
    game.debug.text(`energy: ${getPerSecond(game, 'energy')}, mass: ${getPerSecond(game, 'mass').toFixed(2)}`, 16, 370);
    const current = game.interface.currentTile
    const placing = game.interface.placingStructure
    if (placing.alpha > 0) {
      game.debug.text(`placing: ${placing.frame}`, 16, 390);
      game.debug.text(`x: ${placing.x}, y: ${placing.y}`, 16, 420);
      game.debug.text(`energy: ${placing.structure.energy}, mass: ${placing.structure.mass}`, 16, 450);
    } else if (current) {
      game.debug.text(`selected: ${current.index}`, 16, 390);
      game.debug.text(`x: ${current.x}, y: ${current.y}`, 16, 420);
      game.debug.text(`energy: ${current.structure.energy}, mass ${current.structure.mass}`, 16, 450);
    }
  }
}
