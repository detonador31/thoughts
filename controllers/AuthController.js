const User = require('../models/User')

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static save(req, res) {
        const { name, email, password, confirmpassword } = req.body;
        const data = { name, email, password, confirmpassword };
        let msg = 'Cadastrado com sucesso!'
        // Caso a senha não seja a mesma da confirmação, redireciona o usuário para o form
        if (password !== confirmpassword) {
            msg = 'A senha não confere com a conformação de senha!'
            res.redirect('/')
        }
        User.create(data)
        res.redirect('/dashboard')
    }
}