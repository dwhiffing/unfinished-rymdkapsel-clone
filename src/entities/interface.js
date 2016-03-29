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

    this.selectedStructure = game.add.sprite(50, 50, 'rockSheet')
    this.selectedStructure.alpha = 0
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
      this.updateStructure(-1)
    }
    if (pathKey.isDown) {
      this.updateStructure(6)
    }
    if (bioKey.isDown) {
      this.updateStructure(8)
    }
    if (solarKey.isDown) {
      this.updateStructure(9)
    }
    if (massKey.isDown) {
      this.updateStructure(10)
    }
  }

  updateCursor() {
    const { worldX, worldY } = this.game.input.activePointer
    const { x, y } = this.game.gameMap.getTileXY(worldX, worldY)
    marker.x = x * this.tileSize
    marker.y = y * this.tileSize
    this.selectedStructure.x = marker.x
    this.selectedStructure.y = marker.y
    if (this.game.input.mousePointer.justPressed(50)) {
      if (this.selectedStructure.alpha === 0) {
        this.currentTile = this.game.gameMap.getTile(x, y)
      } else {
        this.game.gameMap.placeStructure(marker.x, marker.y, this.selectedStructure.frame)
      }
    }
  }

  updateStructure(structure) {
    if (structure < 0) {
      this.selectedStructure.alpha = 0
    } else {
      this.selectedStructure.frame = structure
      this.selectedStructure.alpha = 1
    }
  }
}
