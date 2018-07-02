var socket = io('/tasks');

function emit_task(task) {
    socket.emit('task', task)
}

function delete_task(taskId) {
    socket.emit('task-delete', taskId)
}

socket.on('task', (result) => {
    let taskId = result['id']
    let task = document.querySelector('[data-id="' + taskId + '"]')
    let html = ejs.render(`
    <li class="task title-active 
    <% if (t.done) { %>
        task-done
    <% }%>  
    <% if (!t.done) { %>
        task-not-done
    <% }%> 
    " data-id="<%= t.id %>">
        <div class='item'>
            <i class="far fa-square task-check"></i>
            <i class="far fa-check-square task-uncheck"></i>
            <span class="task-name"> 
                <%= t.title %>
            </span>
            <input class="task-input-edit" type="text" value="<%= t.title %>">
            <i class="far fa-trash-alt task-delete"></i>
        </div>
    </li>
`, {t: result})
    if (task) {
        task.outerHTML = html
    } else {
        
        document.querySelector('.tasks').innerHTML += html
    }
})

socket.on('task-delete', (taskId) => {
    let task = document.querySelector('[data-id="' + taskId + '"]')
    if (task) {
        task.remove()
    }
})