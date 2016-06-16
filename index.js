var Client = require('./lib/client')

function createClient (options) {
  return new Client(options)
}

/* exports sintaxis node*/
module.exports = {
  createClient: createClient
}
