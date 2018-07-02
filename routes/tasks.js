
var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', (request, response, next) => {
    models.Tasks.findAll().then((tasks) => {
        response.render('tasks', {tasks: tasks})
    })
})

router.post('/', (request, response, next) => {
    models.Tasks.create(request.body).then((task) => {
        let taskObject = {
            id: task.id, 
            title: task.title,
            done: task.done
        }
        response.json(taskObject)
    })
    // .catch((err) => {
    //     response.statusCode = 400
    //     response.json(err)
    // })
})


router.put('/:taskId', (request, response, next) => {
    var taskId = parseInt(request.params['taskId']);
    models.Tasks.findById(taskId).then(task => {
        if (task === null) {
            response.status(400)
            response.json({'status': 'task not found'})
        } else {
            task.update(request.body)
            response.json(task)
        }
    })
})

router.delete('/:taskId', (request, response, next) => {
    var taskId = parseInt(request.params['taskId']);
    models.Tasks.destroy({where: {
        id: taskId
    }}).then(() => {
        response.status(204)
        response.json({message: 'no data'})
    })
})

    
module.exports = router