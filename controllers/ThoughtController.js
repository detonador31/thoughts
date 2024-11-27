const Thought = require('../models/Thought')

module.exports = class ThoughtController {
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

    static async delete(req, res) {
        const id = req.params.id
        await Thought.destroy({ where: { id: id } })

        res.redirect('/thoughts')
    }

    static async save(req, res) {
        const id = req.body.id

        const thoughtData = {


        }
        if (id) {
            await Thought.update(thoughtData, { where: { id: id } });
        } else {
            await Thought.create(thoughtData);
        }

        res.redirect('/thoughts')
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