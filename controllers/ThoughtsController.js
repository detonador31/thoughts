const Thought = require('../models/Thought')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class ThoughtsController {
    static async new(req, res) {
        res.render('thoughts/new')
    }

    static async edit(req, res) {
        const id = req.params.id
        const thought = await Thought.findOne({ raw: true, where: { id: id } })

        res.render('thoughts/new', { thought })
    }

    static async index(req, res) {
        let search = '';

        if (req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if (req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        //const thoughts = await Thought.findAll({ raw: true })
        const thoughtsData = await Thought.findAll({
            include: User,
            where: {
                title: { [Op.like]: `%${search}%` }
            },
            order: [['createdAt', order]],
        });
        const thoughts = thoughtsData.map((result) => result.get({ plain: true }))

        let thoughtsQtd = thoughts.length

        if (thoughtsQtd === 0) {
            thoughtsQtd = false;
        }

        res.render('thoughts/home', { thoughts, search, thoughtsQtd })
    }

    static async dashboard(req, res) {
        const userId = req.session.userid
        const user = await User.findOne({ include: Thought, where: { id: userId } })

        if (!user) {
            res.redirect('/login')
        }

        // const thoughts = user.Thoughts.map((result) => result.dataValues)
        let emptyThoughts = false;
        if (user.Thoughts.length === 0) {
            emptyThoughts = true
        }

        res.render('thoughts/dashboard', { user: user.get({ plain: true }), emptyThoughts })
    }

    static async delete(req, res) {
        const id = req.params.id
        try {
            await Thought.destroy({ where: { id: id } })
            req.flash('info', 'Removido com sucesso!')
        } catch (e) {
            req.flash(`Erro ao excluir: ${e}`)
        }
        const userId = req.session.userid
        const user = await User.findOne({ include: Thought, where: { id: userId } })


        res.render('thoughts/dashboard', { user: user.get({ plain: true }), })
    }

    static async save(req, res) {
        const id = req.body.id

        const thoughtData = {
            UserId: req.session.userid,
            title: req.body.title
        }
        try {
            if (id) {
                await Thought.update(thoughtData, { where: { id: id } })
                req.flash('info', 'Pensamento atualizado com sucesso!')
            } else {
                await Thought.create(thoughtData);
                req.flash('info', 'Pensamento criado com sucesso!')
            }
            req.session.save(() => {
                res.redirect('/thoughts/dashboard')
            })
        } catch (err) {
            req.flash('info', `Erro ao tentar criar ou atualizar pensamento! ${err}`)
            res.redirect('/thoughts/dashboard')
        }

    }

    static async changeStatus(req, res) {
        const id = req.params.id
        const thought = await Thought.findOne({ raw: true, where: { id: id } })
        if (thought) {

            await Thought.update({}, { where: { id: id } })
        }

        res.redirect('/thoughts')
    }

    static async getUserThoughts(userId) {

    }
}