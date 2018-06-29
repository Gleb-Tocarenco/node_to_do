function sendDataAjax(data, method, url, callback, ...callbackArgs) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            if(callback) {
                callback(JSON.parse(xhr.responseText), ...callbackArgs)
            }
        }
    }
    xhr.onerror = (err) => {
        console.log(err)
    }
    xhr.send(JSON.stringify(data))
}

function getOrDeleteAjax(url, method, callback, ...callbackArgs) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            if(callback) {
                callback()
            }
        }
    }
    xhr.onerror = (err) => {
        console.log(err)
    }
    xhr.send()
}

function sendDataInput() {
    let data = {
        title: document.getElementById('task-input').value
    }
    sendDataAjax(data, "POST", '/tasks/', (...args) => {
        document.getElementById('task-input').value = ""
    })
}

function enableInput(target) {
    let task_element = target.closest('.task');
    task_element.classList.remove('title-active');
    task_element.classList.add('input-active')

    let input = task_element.querySelector('.task-input-edit');
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)
}

document.addEventListener('focusout', event => {
    if(event.target.matches('.task-input-edit')) {
        event.target.closest('.task').classList.remove('input-active')
        event.target.closest('.task').classList.add('title-active')
        var taskId = event.target.closest('.task').getAttribute("data-id")
        var data = {title: event.target.value}
        sendDataAjax(data, "PUT", "/tasks/" + taskId + '/', (...args) => {
            event.target.closest('.task').querySelector('.task-name').innerHTML = event.target.value
        })
    } 
    return
})

document.addEventListener('mouseout', event => {
    if(event.target.matches('.task') || event.target.closest('.task')) {
        event.target.closest('.task').classList.remove('task-focus')
    }
    return
})

document.addEventListener('mouseover', event => {
    if(event.target.matches('.task') || event.target.closest('.task')) {
        event.target.closest('.task').classList.add('task-focus')
    }
    return
})

document.addEventListener('click', event => {
    if (event.target.matches('#task-send')) {
        sendDataInput()
    } else if (event.target.matches('.task-checkbox')) {
        return
    } else if (event.target.matches('.task-name')) {
        enableInput(event.target)
    } else if(event.target.matches('.task-delete')) {
        var taskId = event.target.closest('.task').getAttribute('data-id')
        getOrDeleteAjax('/tasks/' + taskId + '/', "DELETE", () => {
            event.target.closest('.task').remove()
        })
    } else if(event.target.matches('.task-check') || event.target.matches('.task-uncheck')) {
        let task = event.target.closest('.task')
        if (event.target.classList.contains('task-check')) {
            var data = {'done': true}
            task.classList.add('task-done')
            task.classList.remove('task-not-done')
        } else {
            var data = {'done': false}
            task.classList.remove('task-done')
            task.classList.add('task-not-done')
        }
        sendDataAjax(data, 'PUT', '/tasks/' + task.getAttribute('data-id') + '/')
    }
    return
})

document.addEventListener('keyup', event => {
    let key = event.which || event.keyCode;
    if(event.target.matches('#task-input') && key === 13) {
        sendDataInput()
    }
    return
})