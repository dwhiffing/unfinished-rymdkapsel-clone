import { typeLabel, structureCosts } from '../utils'

let cursors, pathKey, escKey, bioKey, solarKey, massKey
let aKey, wKey, sKey, dKey
let marker, panel
const cameraSpeed = 7

export default class Interface {
  constructor(game, tileSize) {
    this.game = game
    this.tileSize = tileSize

    cursors = game.input.keyboard.createCursorKeys()

    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W)
    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A)
    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S)
    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D)

    pathKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
    bioKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO)
    solarKey = game.input.keyboard.addKey(Phaser.Keyboard.THREE)
    massKey = game.input.keyboard.addKey(Phaser.Keyboard.FOUR)
    escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC)
    game.input.addMoveCallback(this.updateCursor, this)

    this.placingStructure = game.add.sprite(50, 50, 'rockSheet')
    this.placingStructure.alpha = 0
    this.currentTile = null

    marker = game.add.graphics()
    marker.lineStyle(2, 0x000000, 1)
    marker.drawRect(0, 0, tileSize, tileSize)

    panel = game.add.graphics()
    panel.beginFill(0x000000)
    panel.drawRect(0, game.height/2, game.width, game.height/2)
    panel.endFill()
    panel.fixedToCamera = true
  }

  update() {
    if (cursors.left.isDown || aKey.isDown) {
      this.game.camera.x -= cameraSpeed
    } else if (cursors.right.isDown || dKey.isDown) {
      this.game.camera.x += cameraSpeed
    }
    if (cursors.up.isDown || wKey.isDown) {
      this.game.camera.y -= cameraSpeed
    } else if (cursors.down.isDown || sKey.isDown) {
      this.game.camera.y += cameraSpeed
    }
    if (escKey.isDown) {
      this.startPlacingStructure(-1)
    }
    if (pathKey.isDown) {
      this.startPlacingStructure(6)
    }
    if (bioKey.isDown) {
      this.startPlacingStructure(8)
    }
    if (solarKey.isDown) {
      this.startPlacingStructure(9)
    }
    if (massKey.isDown) {
      this.startPlacingStructure(10)
    }
  }

  canAfford(costs) {
    const currentEnergy = this.game.getResource('energy')
    const currentMass = this.game.getResource('mass')
    return currentEnergy >= costs.energy && currentMass >= costs.mass
  }

  purchase(type) {
    const currentEnergy = this.game.getResource('energy')
    const currentMass = this.game.getResource('mass')
    const costs = this.getCost(type)
    if (this.canAfford(costs)) {
      this.game.setResource('energy', currentEnergy - costs.energy)
      this.game.setResource('mass', currentMass - costs.mass)
      return true
    }
    return false
  }

  getCost(type) {
    const label = typeLabel[type]
    const costs = structureCosts[label]
    if (label === 'path') return costs
    return {
      energy: Math.round(costs.energy * Math.pow(1.17, this.game.getStructure(label).length)),
      mass: (costs.mass * Math.pow(1.15, this.game.getStructure(label).length)).toFixed(2),
    }
  }

  updateCursor() {
    const { worldX, worldY } = this.game.input.activePointer
    const { x, y } = this.game.gameMap.getTileXY(worldX, worldY)
    const type = this.placingStructure.frame
    marker.x = x * this.tileSize
    marker.y = y * this.tileSize
    this.placingStructure.x = marker.x
    this.placingStructure.y = marker.y
    if (this.game.input.mousePointer.justPressed(50)) {
      if (this.placingStructure.alpha === 0) {
        this.currentTile = this.game.gameMap.getTile(x, y)
      } else if (this.purchase(type)) {
        this.game.gameMap.placeStructure(marker.x, marker.y, type)
      }
    }
  }

  startPlacingStructure(type) {
    if (type < 0) {
      this.placingStructure.alpha = 0
    } else {
      this.placingStructure.frame = type
      this.placingStructure.alpha = 1
      this.placingStructure.structure = this.getCost(type)
    }
  }
}
