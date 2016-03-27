import 'pixi'
import 'p2'
import Phaser from 'phaser'

window.Phaser = Phaser

import BootState from './states/boot'
import LoadState from './states/load'
import PlayState from './states/play'

(function() {
  let game = new Phaser.Game(375, 667, Phaser.AUTO, 'app')
  console.log(game)

  game.state.add('boot', BootState)
  game.state.add('load', LoadState)
  game.state.add('play', PlayState)
  game.state.start('boot')
})()
