tvmaze-dh

##Usage

''' js
var tvmaze = require('tvmaze-dh')

var client = tvmaze.createClient()

client.shows(function (err, shows) {
	// do something shows...
})

client.search('lost', function (err, shows) {
	// do something shows...
})
'''