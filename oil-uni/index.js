// index.js
const http = require('./lib/http')
const message = require('./lib/message')
// const router = require('./lib/router')
// const validator = require('./lib/validator')
// const date = require('./lib/date')
const store = require('./lib/store')
// const to = require('./lib/to')
const oil = {
  message,
  http,
  // router,
  // validator,
  // date,
  store,
  // to,
  install(Vue) {
    this.store._init()
    for (let i in this) {
      if (i == 'install') {
        continue
      }
      Vue.prototype[i] = this[i]
    }

    delete this.install
  }
}

export default oil