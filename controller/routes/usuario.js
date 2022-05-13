const { render } = require("ejs");

module.exports = function (app) {
    app.get('/login', function(req, res) {
        if(req.query.fail) {
            res.render('usuario/Login', {
                mensagemLogin: 'Usuário e ou...'
            });
        } else {
            res.render('usuario/login', {mensagemLogin: null});
        }   
    });

    app.post('/login/executar', function(req, res) {
        if(req.body.nome === "escreva seu nome" && req.body.senha === "123456") {
            res.render('lista/usuario', {
                mensagem: 'cadastrado'
            });
        } else {
            res.render('/login/?fail=true');
        }   
    });
}