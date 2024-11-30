const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async save(req, res) {
        const { name, email, senha, confirmpassword } = req.body;
        // Caso a senha não seja a mesma da confirmação, redireciona o usuário para o form
        if (senha !== confirmpassword) {
            req.flash('info', 'A senha não confere com a confirmação de senha!')
            res.render('auth/register')
            return
        }
        // Checa se o usuário existes
        if (await User.findOne({ where: { email: email } })) {
            req.flash('info', 'Este Usuário já existe! Tente outro usuário!')
            res.render('auth/register')
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(senha, salt)

        const data = { name, email, senha: hashedPassword };
        try {
            const createdUser = await User.create(data)
            //initialize session
            req.session.userid = createdUser.id
            req.flash('info', 'Cadastrado com sucesso!')
            req.session.save(() => {
                res.redirect('/')
            })

        } catch (err) {
            req.flash('info', 'erro ao tentar salvar o usuario' + err)
            res.render('auth/register')
        }
    }

}