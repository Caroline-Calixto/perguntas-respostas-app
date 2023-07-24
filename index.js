const express = require("express");
const app = express();

app.set("view engine", "ejs"); // indicando pra o express usar o EJS como view engine
app.use(express.static("public"));

app.get("/", (req, resp) => {
    resp.render("home");
});

app.get("/perguntar", (req, resp) => {
    resp.render("perguntar");
});


app.listen(8080, () => { console.log("ok"); });