function Client (options) {
  this.options = options || {}
  this.endpoint = this.options.endpoint || 'http://api.tvmaze.com'
}

Client.prototype.shows = function (cb) {
  cb()
}

module.exports = Client
