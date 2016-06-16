/*
  tape en su naturaleza me entrega una funcion y esa funcion
  me va permitir crear casos de prueba para mi app
*/

var test = require('tape')
var tvmaze = require('../')
var Client = require('../lib/client')

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
