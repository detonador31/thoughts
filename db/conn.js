const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('thoughts', 'root', '123456', {
    host: '127.0.0.1',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado ao mysql com sucesso!')
} catch (err) {
    console.log(`Não foi possivel conectar ao Mysql: ${err}`)
}

module.exports = sequelize