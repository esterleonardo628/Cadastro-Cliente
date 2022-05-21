const usuarioBD = require('./db.js');
const seguranca = require('../components/segurança');

async function selectUsuario() {
    const conn = await usuarioBD.connect();
    const [rows] = await conn.query('SELECT * FROM usuario;');
    return rows;
}

async function getUsuarioId(id) {
    const conn = await usuarioBD.connect();
    const sql  = 'SELECT * FROM usuario WHERE id=?';
    const values = [id];
    const [rows] = await conn.query(sql, values);

    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
}

async function login(nome, senha){
    const conn = await usuarioBD.connect();
    const sql = 'SELECT * FROM usuario WHERE nome=? and senha=?';
    const values = [nome, seguranca.ocultarSenha(senha)];
    const [rows] = await conn.query(sql, values);
    if (rows.length > 0)
        return rows;
    else return null;
}

async function inserUsuario(usuario){
    const conn = await usuarioBD.connect();
    const sql = 'UPDATE usuario SET nome=? , senha=? WHERE id=?);';
    const values =  [usuario.nome, seguranca.ocultarSenha(usuario.senha)];
    return  await conn.query(sql, values);
}

async function deleteUsuario(id){
    const conn = await usuarioBD.connect();
    const sql = 'DELETE FROM usuario where id=?;';
    return  await conn.query(sql, [id]);
}

module.exports = {
    selectUsuario,
    getUsuarioId,
    login,
    inserUsuario,
    deleteUsuario
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