const path = require('path');
const fsd = require('fs');
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

app.post('/crear', (request, response) => {
  response.setHeader('Content-type', 'text/plain');
  const titulo = request.body.titulo;
  const texto = request.body.texto;
  console.log(titulo,texto);

  var fs = require('fs');

  let nombreFolder = 'files/'+titulo+'.md';
  fs.appendFile(nombreFolder, texto, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  response.setHeader('Content-type', 'html/plain');
  response.send('Datos guardados con éxito');
});

app.get('/enlistar', (request, response) => {
  console.log("entro entlta");
  fsd.readdir('files', 'utf8',
    (err, data) => {
      if (err) {
	console.error(err)
	response.status(500).json({
	  error: 'message'
	})
	return
      }
      response.json({
	text : data
      })
    })
  console.log("saliendo");
})

/*app.get('/enlistar',(request, response)=>{
  response.setHeader('Content-type', 'text/plain');
  let files = fsd.readdirSync("files");

})*/
