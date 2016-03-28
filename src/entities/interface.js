let cursors, pathKey, escKey, bioKey, solarKey, massKey
let marker, selectedStructure, panel

export default class Interface {
  constructor(game, tileSize) {
    this.game = game
    this.tileSize = tileSize

    cursors = game.input.keyboard.createCursorKeys()

    pathKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
    bioKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO)
    solarKey = game.input.keyboard.addKey(Phaser.Keyboard.THREE)
    massKey = game.input.keyboard.addKey(Phaser.Keyboard.FOUR)
    escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC)
    game.input.addMoveCallback(this.updateMarker, this)

    selectedStructure = game.add.sprite(50, 50, 'rockSheet')
    selectedStructure.alpha = 0

    marker = game.add.graphics()
    marker.lineStyle(2, 0x000000, 1)
    marker.drawRect(0, 0, tileSize, tileSize)

    panel = game.add.graphics()
    panel.beginFill(0x000000)
    panel.drawRect(0, game.height/2, game.width, game.height/2)
    panel.endFill()
    panel.fixedToCamera = true
    this.currentTile = {x:0,y:0}
  }

  update() {
    if (cursors.left.isDown) {
      this.game.camera.x -= 10
    } else if (cursors.right.isDown) {
      this.game.camera.x += 10
    }
    if (cursors.up.isDown) {
      this.game.camera.y -= 10
    } else if (cursors.down.isDown) {
      this.game.camera.y += 10
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

  updateMarker() {
    let x = this.game.gameMap.groundLayer.getTileX(this.game.input.activePointer.worldX)
    let y = this.game.gameMap.groundLayer.getTileY(this.game.input.activePointer.worldY)
    marker.x = x * this.tileSize
    marker.y = y * this.tileSize
    selectedStructure.x = marker.x
    selectedStructure.y = marker.y
    if (this.game.input.mousePointer.justPressed(50)) {
      if (selectedStructure.alpha === 0) {
        this.currentTile = this.game.gameMap.map.getTile(x, y, this.game.gameMap.groundLayer, true)
      } else {
        map.putTile(
          selectedStructure.frame,
          this.game.gameMap.structureLayer.getTileX(marker.x),
          this.game.gameMap.structureLayer.getTileY(marker.y),
          this.game.gameMap.structureLayer
        )
      }
    }
  }

  updateStructure(structure) {
    if (structure < 0) {
      selectedStructure.alpha = 0
    } else {
      selectedStructure.frame = structure
      selectedStructure.alpha = 1
    }
  }
}
