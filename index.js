var Client = require('./lib/client')

function createClient () {
  return new Client()
}

/* exports sintaxis node*/
module.exports = {
  createClient: createClient
}
