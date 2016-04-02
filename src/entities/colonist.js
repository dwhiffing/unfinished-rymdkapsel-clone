export default class Colonist {
  constructor(game, x, y, manager) {
    this.game = game
    this.manager = manager
    this.sprite = game.add.sprite(x, y, 'colonist')
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    this.idle = true
  }
  update() {
    if (this.idle) {
      // let [coord, path] = this.manager.request('structure', this.sprite.x, this.sprite.y)
      let coord = this.manager.request('structure', this.sprite.x, this.sprite.y)
      if (coord) {
        let { x, y, cb } = coord
        let X = Math.floor(this.sprite.x / this.game.tileSize)
        let Y = Math.floor(this.sprite.y / this.game.tileSize)
        let path = this.game.gameMap.getPath({ x: X, y: Y }, {x, y: y}, true, true)
        this.idle = false
        this.travel(path, cb)
      }
    }
  }
  travel(path, cb) {
    let lastTween, firstTween, finalTween
    path.forEach((tile, index) => {
      if (index === 0) return
      const tween = this.game.add.tween(this.sprite).to({ x: tile[0] * this.game.tileSize + this.game.tileSize/2, y: tile[1] * this.game.tileSize + this.game.tileSize/2 }, 500)
      if (lastTween) {
        lastTween.chain(tween)
      }
      if (index === 1) {
        firstTween = tween
      }
      if (index === path.length-1) {
        finalTween = tween
      }
      lastTween = tween
    })

    finalTween.onComplete.add(() => {
      this.idle = true
      cb()
    })

    firstTween.start()
  }
}
