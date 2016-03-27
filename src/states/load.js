export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.image('rock', 'images/rock.jpg')
  },

  onLoadComplete() {
    this.game.state.start('play', true, false)
  }
}
