/*
  tape en su naturaleza me entrega una funcion y esa funcion
  me va permitir crear casos de prueba para mi app
*/

var test = require('tape')
var nock = require('nock') // simulador de http request
var tvmaze = require('../')
var Client = require('../lib/client')

/*
  lo que hace nock es que intercepta los llamados que hace node internamente utilizando http
  request y en vez de hacer la peticion real la hace al servidor ficticio que estoy creando
*/
var endpoint = 'http://api.tvmaze.test' /* url de prueba solo para test*/

/*
  function test recibe un callback donde tenemos el onjeto llamado t que contiene las aserciones,
  las aserciones son las diferentes funciones que me van a poder permitir a mi realizar las pruebas
  sobre mi codigo, por ejemplo la existencia de una funcion, si algo es igual a algo que espero que
  sea igual, que error ocurrio o no, si la funcion lanzo un error o no
*/
test('should create a client', function (t) {
  /* primer prueba - la function createClient deberia existir, si no es null o undefined pasa*/
  t.ok(tvmaze.createClient, 'should exist')
  /* si el tipo de ese objeto createClient es igual a una function*/
  t.equals(typeof tvmaze.createClient, 'function', 'should be a function')

  var client = tvmaze.createClient()
  /* que resultado de createClient() sea una instancia de una clase Client*/
  t.ok(client instanceof Client, 'should be instance of client')

  /* terminar prueba - por naturaleza de node asyncrona hay que terminarla*/
  t.end()
})

/* prueba para que peticion falle con un endpoint descono*/
test('should fail with onknown endpoint', function (t) {
  var client = tvmaze.createClient({endpoint: endpoint})

  nock(endpoint)
    .get('/foo')
    .reply(404)

  client._request('/foo', 'GET', null, function (err, body) {
    t.ok(err, 'should faild')
    t.end()
  })
})

/* deberia fallar si no hay un query de busqueda */
test('should fail if not query is passed', function (t) {
  var client = tvmaze.createClient({endpoint: endpoint})

  nock(endpoint)
    .get('/search/shows')
    .reply(400, {
      code: 0,
      message: 'Missing required parameter: q',
      name: 'Bad request error',
      status: 400
    })

  client._request('/search/shows', 'GET', null, function (err, res) { /* aqui no recibo ningun body porque esa rama solomaente devuelve un error*/
    t.ok(err, 'bad request error')
    t.error(res, 'should be null')
    t.end()
  })
})

test('should list shows', function (t) {
  var client = tvmaze.createClient({endpoint: endpoint}) /* le paso un objeto de configuracion para que haga peticiones a endpoint creado ficticio*/
  t.equals(typeof client.shows, 'function', 'should be a function')

  /* simulando request para listar shows con nock para test*/
  nock(endpoint)
    .get('/shows')
    .reply(200, []) /* responde  con un estado 200 y un arreglo vacio*/

  /* llamado a shows que me retorna o un error o la lista de shows*/
  client.shows(function (err, shows) {
    t.error(err, 'should be not an error')
    /* que el resultado sea un arreglo*/
    t.ok(Array.isArray(shows), 'should be an array')
    t.end()
  })
})

test('should search shows', function (t) {
  var client = tvmaze.createClient({endpoint: endpoint})

  t.equals(typeof client.search, 'function', 'should be a function')

  nock(endpoint)
    .get('/search/shows')
    .query({q: 'walking'})
    .reply(200, [{name: 'walking'}])

  client.search('walking', function (err, shows) {
    t.error(err, 'should be not an error')
    t.ok(Array.isArray(shows), 'should be an array')
    t.equals(shows[0].name, 'walking', 'should retrieve a show name')
    t.end()
  })
})

test('should search show by id', function (t) {
  var client = tvmaze.createClient({endpoint: endpoint})
  t.equals(typeof client.showId, 'function', 'should be a function')

  nock(endpoint)
    .get('/shows/123')
    .query(1)
    .reply(200, {id: 123, name: 'walking'})

  client.showId(123, function (err, show) {
    t.error(err, 'should be not an error')
    t.ok(show, 'should exist')
    t.equals(show.id, 123)
    t.equals(show.name, 'walking')
    t.end()
  })
})
