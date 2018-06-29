module.exports = function(sequelize, DataTypes) {
    const Tasks = sequelize.define('task', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    Tasks.associate = function(models) {
        Tasks.hasMany(models.SubTasks)
    }

    return Tasks
}