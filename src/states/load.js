export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.image('rock', 'images/rock2.png')
    this.load.image('colonist', 'images/colonist.png')
    this.load.spritesheet('rockSheet', 'images/rock2.png', 64, 64)
  },

  onLoadComplete() {
    this.game.state.start('play', true, false)
  }
}
