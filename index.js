const express = require("express");
const app = express();

const bodyParser = require('body-parser');

const connection = require("./database/database");
const perguntaModel = require("./database/Pergunta");

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.set("view engine", "ejs"); // indicando pra o express usar o EJS como view engine
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false})); // decodificar os dados enviados pelo forms
app.use(bodyParser.json()); // config para usar o formato json

app.get("/", (req, resp) => {
    resp.render("home");
});

app.get("/perguntar", (req, resp) => {
    resp.render("perguntar");
});

app.post("/salvarpergunta",(req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido! titulo " + titulo + " " + " descricao " + descricao);
});


app.listen(8080, () => { console.log("ok"); });