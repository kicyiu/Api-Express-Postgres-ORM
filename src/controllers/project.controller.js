import Project from '../models/Projects';

export async function createProject(req, res) {
    const { name, priority, description, deliverydate } = req.body;
    try {
        let newProject = await Project.create({
            name,
            priority,
            description,
            deliverydate
        }, {
            fields: ['name', 'priority', 'description', 'deliverydate']
        });
    
        if(newProject) {
            return res.json({
                message: 'Project created successfully',
                data: newProject
            })
        }
    }
    catch (e) {
        console.error('createProject Error: ', e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        })
    }

    res.send('received');
};


export async function getProjects(req, res) {
    try {
        const projects = await Project.findAll();
        res.json({
            data: projects
        });
    }
    catch(e) {
        console.error('getProjects Error: ', e);

    }
}

export async function getOneProject(req, res) {
    
    const { id } = req.params;
    const project = await Project.findOne({
        where: {
            id
        }
    });
    res.json(project);
}

export async function deleteProject(req, res) {
    const { id } = req.params;
    const deleteRowCount = await Project.destroy({
        where: {
            id
        }
    });
    res.json({
        message: 'Project deleted succesfully',
        count: deleteRowCount
    })
}

export async function updateProject(req, res) {
    const { id } = req.params;
    const { name, priority, description, deliverydate } = req.body;

    /* const projects = await Project.findAll({
        attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
        where: {
            id
        }
    });

    if(projects.length > 0) {
        projects.forEach(async project => {
            await project.update({
                name,
                priority,
                description,
                deliverydate
            }); 
        });
    } */

    const projects = await Project.update({
        name,
        priority,
        description,
        deliverydate
    }, {
        where: { id }
    })

    return res.json({
        message: 'Projects updated successfully',
        data: projects
    });
}