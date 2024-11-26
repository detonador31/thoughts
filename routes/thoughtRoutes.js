const express = require('express')
const router = express.Router()

const ThoughtController = require('../controllers/ThoughtController')

router.get('/new', ThoughtController.new)
router.post('/save', ThoughtController.save)
router.get('/', ThoughtController.index)
router.get('/edit/:id', ThoughtController.edit)
router.get('/delete/:id', ThoughtController.delete)
router.get('/change-status/:id', ThoughtController.changeStatus)

module.exports = router