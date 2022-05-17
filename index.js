const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const { request } = require('http');
const app = express();
const Markdown =required('markdown-it'),
  md = new MarkdownIt();
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

app.post('/crear', (request, response) => {
  response.setHeader('Content-type', 'text/plain');
  const titulo = request.body.titulo;
  const texto = request.body.texto;
  console.log(titulo,texto);

  var fs = require('fs');

  let NombreFolder ='Directorio/'+titulo+'.md';
  fs.appendFile(NombreFolder, texto, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  response.setHeader('Content-type', 'html/plain');
  response.send('Datos guardados con éxito');
});

app.post('Directorio/',(request, response) => {
  console.log(request.body)
  let markDownText = request.body.text
    console.log(markDownText)
    let htmlText = md.render(markDownText)
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify({
        text: htmlText
    }))
})