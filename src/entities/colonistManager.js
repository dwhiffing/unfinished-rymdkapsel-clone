import Colonist from './colonist'

export default class ColonistManager {
  constructor(game,x, y) {
    this.game = game
    this.group = game.add.group()
    this.members = []
    this.queued = {}
    this.create(x, y)
    this.create(x, y)
    this.create(x, y)
    this.create(x, y)
    this.create(x, y)
    this.create(x, y)
  }
  create(x, y) {
    const colonist = new Colonist(this.game, x, y, this)
    this.members.push(colonist)
    this.group.add(colonist.sprite)
  }
  queue(key, x, y, cb) {
    if (!this.queued[key]) {
      this.queued[key] = []
    }
    this.queued[key].push({x, y, cb})
  }
  update() {
    this.members.forEach(member => member.update())
  }
  request(key='structure', x, y) {
    const queue = this.queued[key]
    let jobToReturn
    if (queue && queue.length > 0) {
      // queue.forEach((job, index) => {
      //   let X = Math.floor(x / this.game.tileSize)
      //   let Y = Math.floor(y / this.game.tileSize)
      //   let path = this.game.gameMap.getPath({ x: X, y: Y }, {x: job.x, y: job.y}, true, true)
      //   if (path.length > 1) {
      //     queue.splice(index, 1)
      //     jobToReturn = [job, path]
      //   }
      // })
      return queue.pop()
    }
    // return jobToReturn || [null, null]
  }
}
