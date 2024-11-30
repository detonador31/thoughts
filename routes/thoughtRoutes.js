const express = require('express')
const router = express.Router()
const ThoughtsController = require('../controllers/ThoughtsController')

// Helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/new', checkAuth, ThoughtsController.new)
router.post('/save', checkAuth, ThoughtsController.save)
router.get('/', ThoughtsController.index)
router.get('/dashboard', checkAuth, ThoughtsController.dashboard)
router.get('/edit/:id', checkAuth, ThoughtsController.edit)
router.get('/delete/:id', checkAuth, ThoughtsController.delete)
router.get('/change-status/:id', checkAuth, ThoughtsController.changeStatus)

module.exports = router