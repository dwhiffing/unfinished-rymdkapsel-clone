export default {
  create() {
    this.game.scale.scaleMode = 2
    this.game.state.start('load', true, false)
  }
}
