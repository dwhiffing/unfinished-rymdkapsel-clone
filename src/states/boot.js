export default {
  create() {
    this.game.scale.scaleMode = Phaser.ScaleManager.NONE
    this.game.state.start('load', true, false)
  }
}
