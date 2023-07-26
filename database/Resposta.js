const Sequelize = require('sequelize');
const connection = require("./database");

const Resposta = connection.define('resposta', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: { // relacionamento cru
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({ force: false }).then(() => {
});

module.exports = Resposta