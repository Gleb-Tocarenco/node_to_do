const Sequelize = require('sequelize')

const sequelize = new Sequelize('node_to_do', 'node_to_do_user', 'pwd', {
    host: 'localhost',
    post: 3306,
    dialect: 'mysql'
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to database has been established')
    }).catch((err) => {
        console.log('Unable connect to database', err)
    })