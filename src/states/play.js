var map
var layer1
var layer2
var layer3

var marker
var currentTile = {x:0,y:0}
var currentLayer

var cursors

var tileSize = 64
var worldSize = 49

export default {
  create(game) {
    game.stage.backgroundColor = '#2d2d2d'
    map = game.add.tilemap(null, tileSize, tileSize)
    map.addTilesetImage('rock')

    layer1 = map.create('level1', worldSize, worldSize, tileSize, tileSize)
    layer1.resizeWorld()

    layer2 = map.createBlankLayer('level2', worldSize, worldSize, tileSize, tileSize)

    currentLayer = layer1
    map.fill(0, 0, 0, worldSize, worldSize, layer1)
    map.fill(7, Math.floor(worldSize/2), Math.floor(worldSize/2), 1, 1, layer2)

    marker = game.add.graphics()
    marker.lineStyle(2, 0x000000, 1)
    marker.drawRect(0, 0, tileSize, tileSize)

    game.input.addMoveCallback(updateMarker.bind(this, game), this)

    cursors = game.input.keyboard.createCursorKeys()

    game.camera.x = game.world.width/2 - game.width/2
    game.camera.y = game.world.height/2 - game.height/2
  },

  update(game) {
    if (cursors.left.isDown) {
      game.camera.x -= 10
    } else if (cursors.right.isDown) {
      game.camera.x += 10
    }
    if (cursors.up.isDown) {
      game.camera.y -= 10
    } else if (cursors.down.isDown) {
      game.camera.y += 10
    }
  },

  render(game) {
    game.debug.text(`x: ${currentTile.x}, y: ${currentTile.y}`, 16, 350);
  }
}

function updateMarker(game) {
  let x = currentLayer.getTileX(game.input.activePointer.worldX)
  let y = currentLayer.getTileY(game.input.activePointer.worldY)
  marker.x = x * tileSize
  marker.y = y * tileSize
  if (game.input.mousePointer.isDown) {
    currentTile = map.getTile(x, y, layer1, true)
  }
}
