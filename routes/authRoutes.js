const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.login)
router.post('/login', AuthController.loginExec)
router.get('/register', AuthController.register)
router.post('/register', AuthController.save)
router.get('/logout', AuthController.logout)

module.exports = router