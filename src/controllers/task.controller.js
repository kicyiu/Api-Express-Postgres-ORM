import Task from '../models/Tasks';

export async function getTasks(req, res) {
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'projectid', 'name', 'done'],
            order: [
                ['id', 'DESC']
            ]
        });
        res.json({
            data: tasks
        });
    }
    catch(e) {
        console.error('getTasks Error: ', e);

    }
}

export async function createTask(req, res) {
    const { name, done, projectid } = req.body;
    try {
        let newTask = await Task.create({
            name,
            done,
            projectid
        }, {
            fields: ['name', 'done', 'projectid']
        });
    
        if(newTask) {
            return res.json({
                message: 'Task created successfully',
                data: newTask
            })
        }
    }
    catch (e) {
        console.error('createTask Error: ', e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        })
    }
}

export async function updateTask(req, res) {
    const { id } = req.params;
    const { projectid, name, done } = req.body;

    /* const task = await Task.findOne({
        attributes: ['name', 'projectid', 'done'],
        where: {
            id
        }
    }); */

    const updatedTask = await Task.update({
        name,
        done,
        projectid
    }, {
        where: { id }
    })

    return res.json({
        message: 'Task updated successfully',
        updatedTask
    });
}

export async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const deleteRowCount = await Task.destroy({
            where: {
                id
            }
        });
        res.json({
            message: 'Task deleted succesfully',
            count: deleteRowCount
        })
    }
    catch(e) {
        console.error('deleteTask Error: ', e);
    }
    
}

export async function getOneTask(req, res) {
    const { id } = req.params;
    const task = await Task.findOne({
        where: {
            id
        }
    });
    
    if(task) {
        res.json(task);
    }
    else {
        res.json({
            message: 'Task not found'
        });
    }
}

export async function getTasksByProject(req, res) {
    const { projectid } = req.params;
    const tasks = await Task.findAll({
        attributes: ['id', 'projectid', 'done', 'name'],
        where: { projectid }
    })

    if(tasks.length > 0) {
        res.json({ tasks });
    }
    else {
        res.json({
            message: 'Not found tasks associated to this project'
        });
    }
    
}