const { DEL_FLAG_EXIST, DEL_FLAG_DELETED, TASK_STATUS_DOING, TASK_STATUS_COMPLETED } = require("../constants/constants");
const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

exports.getList = (req, res) => {
    let userId = req.body.userId;
    let criteria = req.body.form;
    let status;
    switch(req.body.status) {
        case 'all':
            status = null
            break;
        case 'pending':
            status = TASK_STATUS_DOING
            break;
        case 'completed':
            status = TASK_STATUS_COMPLETED;
            break;
    }

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    if (!userId) {
        res.status(400).send({
            message: "Check log in please!"
        });
        return;
    }
    var condition;
    condition = status !== null ? criteria ? {
        userId: userId,
        status: status,
        [Op.or]: [
            { title: { [Op.like]: `%${criteria}%` } },
            { description: { [Op.like]: `%${criteria}%` } },
            { tags: { [Op.like]: `%${criteria}%` } }
        ],
        delFlag: DEL_FLAG_EXIST
    } : { userId: userId, status,  delFlag: DEL_FLAG_EXIST} : 
    criteria ? {
        userId: userId,
        [Op.or]: [
            { title: { [Op.like]: `%${criteria}%` } },
            { description: { [Op.like]: `%${criteria}%` } },
            { tags: { [Op.like]: `%${criteria}%` } }
        ],
        delFlag: DEL_FLAG_EXIST
    } : { userId: userId,  delFlag: DEL_FLAG_EXIST};
    Task.findAll({ where: condition })
        .then(data => {
            const resdata = data.length > 0 ? data : false;
            const status = [TASK_STATUS_COMPLETED, TASK_STATUS_DOING]
            res.send({resdata, status});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

exports.add = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const task = {
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags.join(),
        status: req.body.status,
        delFlag: DEL_FLAG_EXIST
    }
    const condition = { title: task.title }
    Task.findAll({ where: condition })
        .then(data => {
            if (data.length === 0) {
                Task.create(task)
                    .then(data => {
                        res.send(true);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Task."
                        });
                    });
            } else {
                res.send(false);
            }
        });
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const task = {
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags.join(),
        status: req.body.status,
        delFlag: DEL_FLAG_EXIST
    }

    Task.update(task, {
        where: { id: req.body.id }
    })
        .then(num => {
            if (num) {
                res.send({
                    message: "Task was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Task with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const task = {
        delFlag: DEL_FLAG_DELETED
    }
    const condition = {id : req.body}
    Task.update(task, {
        where: condition
    })
        .then(num => {
            if (num) {
                res.send({
                    message: "deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot delete with id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting Task with id=" + id
            });
        });
}