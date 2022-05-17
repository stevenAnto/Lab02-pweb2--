const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('pub'));
app.use(express.static('css'));
app.listen(3000, () => {
  console.log("Escuchando en: http://localhost:3000")

});

app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/crear', (request, response) => {
  response.setHeader('Content-type', 'text/plain');
  const titulo = request.body.nombre;
  const texto = request.body.texto;

  var fs = require('fs');

  fs.appendFile(nombre + '.txt', titulo, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  response.setHeader('Content-type', 'html/plain');
  response.send('Datos guardados con éxito');
});
