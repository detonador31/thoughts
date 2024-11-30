const Thought = require('../models/Thought')

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
        //const thoughts = await Thought.findAll({ raw: true })

        res.render('thoughts/index')
    }

    static async dashboard(req, res) {
        //const thoughts = await Thought.findAll({ raw: true })

        res.render('thoughts/dashboard')
    }

    static async delete(req, res) {
        const id = req.params.id
        await Thought.destroy({ where: { id: id } })

        res.redirect('/thoughts')
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
}