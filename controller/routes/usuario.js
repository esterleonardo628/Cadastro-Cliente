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

    app.get("/cadastro", function(req, res) {
        if(req.query.fail) {
            res.render('usuario/Cadastro', {
                mensagem: 'Cadastro'
            });
        } else {
            res.render('usuario/Cadastro', {
                mensagem: null 
            });
        }
    })
}


app.post('/cadastro/usuario/edit/salvar', (req, res) => {
    var usuario = {nome: req.body.nome, 
    senha: req.body.senha,
    id: req.body.id};

    try {
        usuarioBanco.updateUsuario(usuario);
        res.render('usuario/Sucesso', { mensagem: 'alterado'});
    }catch (error) {
        res.render('usuario/EditUsuario', { title: 'Edição Cadastro',
    mensagem: 'Erro no cadastrado'});
    }

});

app.post('/cadastro/usuario/salvar', (req,res) => {
    try {
        var usuario = {nome: req.body.nome,
            senha: seguranca.ocultarSenha(req.body.senha)}
        usuarioBanco.insertUsuario(usuario);
        res.render('usuario/Cadastro', {title: 'Cadastro,
        mensagem: 'Erro no Cadastro'});
    }
});

app.get('lista/Usuario', async (req, res, next) => {
    try {
        const docs = await usuarioBanco.selectUsuario();
        res.render('usuario/Lista', {mensagem: 'Lista de Usuários', docs});
    } catch (err) {
        next(err);
    }
});

app.get('lista/Usuario', async (req, res, next) => {
    try {
        const docs = await usuarioBanco.selectUsuario();
        res.render('usuario/Lista', {mensagem: 'Lista de Usuários', docs});
    } catch (err) {
        next(err);
    }
});

app.get('delete/usuario/:id', async (req, res, next) => {
    try {
        var id = req.params.id;
        await usuarioBanco.deleteUsuario(id);
        const docs = await usuarioBanco.selectUsuario();
        res.render('usuario/Lista', { mensagem: 'usuario excluiodo com sucesso', docs });
    } catch (err) {
        next(err);
    }
});

app.get('edit/usuario/:id', async (req, res, next) => {
    try {
        var id = req.params.id;
        await usuarioBanco.deleteUsuario(id);
        const docs = await usuarioBanco.selectUsuario();
        res.render('usuario/EditUsuario', { mensagem: 'usuario excluiodo com sucesso', docs });
    } catch (err) {
        next(err);
    }
});

