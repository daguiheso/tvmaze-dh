var request = require('client-request')
var qs = require('querystring')

function Client (options) {
  /* las options se reciben solo en los test*/
  this.options = options || {}
  this.endpoint = this.options.endpoint || 'http://api.tvmaze.com'
}

/* function privada u oculta reutilizable para hacer request*/
Client.prototype._request = function (path, method, params, cb) {
  var uri = this.endpoint + path

  /* si le pasamos parametros debemos construir el query string,
     en este caso los parametros son un objeto { q: 'the walking dead' }
     qs lo que hace es pasarmelo a q=the_walking_dead
  */
  if (params) {
    uri = uri + '?' + qs.encode(params)
  }

  request({
    uri: uri,
    method: method,
    json: true
  }, function (err, res, body) {
    if (err) return cb(err)

    if (res.statusCode !== 200) return cb(new Error('An error ocurred in the request'))

    cb(null, body)
  })
}

Client.prototype.shows = function (cb) {
  this._request('/shows', 'GET', null, cb)
}

Client.prototype.search = function (show, cb) {
  this._request('/search/shows', 'GET', {q: show}, cb)
}

module.exports = Client
