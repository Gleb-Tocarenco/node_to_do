module.exports = function(sequelize, DataTypes) {
    const SubTasks = sequelize.define('subtask', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    SubTasks.associate = function(models) {
        SubTasks.belongsTo(models.Tasks)
    }

    return SubTasks
}