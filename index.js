const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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

app.use(bodyParser.urlencoded({ extended: false })); // decodificar os dados enviados pelo forms
app.use(bodyParser.json()); // config para usar o formato json

// ROTAS
app.get("/", (req, resp) => {
    // listando as perguntas cadastradas
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ] }).then(perguntas => {
        resp.render("home", {
            perguntas: perguntas
        });

    })
});

app.get("/perguntar", (req, resp) => {
    resp.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    // criando a pergunta no banco de dados
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        resp.redirect("/")
    })
});

app.get("/pergunta/:id",(req ,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[ 
                    ['id','DESC'] 
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        }else{ // Não encontrada
            res.redirect("/");
        }
    });
})


app.post("/responder", (req, resp) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        resp.redirect("/pergunta/" + perguntaId)
    })
});

app.listen(8080, () => { console.log("ok"); });