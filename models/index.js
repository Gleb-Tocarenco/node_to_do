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


const models = {
    Tasks: sequelize.import('./tasks'),
    SubTasks: sequelize.import('./subtasks')
}

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models)
    }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models