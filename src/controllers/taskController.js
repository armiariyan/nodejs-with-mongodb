import Status from '../models/Status';
import Task from '../models/Task';

export const createTasks = async (req, res) => {
    try {
        const task = new Task(req.body);
        // Menambahkan User Id berdasarkan Id user yang login
        task.userId = req.userData.userId;
        await task.save(err => {
            if (err) {
                res.send(err)
            } else {
                res.status(201).json({
                    info: "Task created successfully",
                    data: task
                })
            }
        });
    } catch (err) {
        res.send({
            message: "Something went wrong!",
            error: err
        })
    }
}

export const getTasksById = async (req, res) => {
    Task.findById(req.params.id)
        .populate('userId', 'username email')
        .populate('StatusId', '_id Label')
        .exec()
        .then(tasks => {

            if (tasks === null) {
                res.send({
                    info: "Task not found!"
                })
            } else {
                res.status(200).json({
                    tasks: tasks
                });
            }
        }).catch(err => {
            res.status(500).json({
                error: err,
                status: false
            });
        });
}

export const getTasks = async (req, res) => {
    Task.find()
        .populate('userId', 'username email')
        .populate('StatusId', '_id Label')
        .exec()
        .then(tasks => {
            res.status(200).json({
                count: tasks.length,
                status: true,
                tasks: tasks
            });
        }).catch(err => {
            res.status(500).json({
                error: err,
                status: false
            });
        });
}

export const getTasksByStatus = async (req, res) => {
    await Status.findOne({
        Label: req.params.status
    }).then(async result => {
        await Task.find({
                StatusId: result.id
            })
            .populate('userId', 'username email')
            .exec()
            .then(tasks => {
                res.status(200).json({
                    status: true,
                    tasks: tasks
                });
            }).catch(err => {
                res.status(500).json({
                    error: err,
                    status: false
                });
            });


    })

}

export const updateTasks = async (req, res) => {
    const checkId = await Task.findById(req.params.id);
    if (!checkId) return res.status(404).json({
        message: "Data not found!"
    });

    try {
        Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, (err, result) => {
            res.send({
                info: "Task Updated Successfully",
                newTasks: result
            });
        })
    } catch (error) {
        res.status(400).json({
            message: err.message
        })
    }
}

export const updateTasksStatus = async (req, res) => {
    const checkId = await Task.findById(req.params.id);
    if (!checkId) return res.status(404).json({
        message: "Data not found!"
    });

    try {
        Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, (err, result) => {
            res.send({
                info: "StatusId Updated Successfully",
                newTasks: result
            });
        })
    } catch (err) {
        res.send({
            info: "Error",
            message: err.message
        })
    }




}

export const deleteTasks = async (req, res) => {
    await Task.deleteOne({
        _id: req.params.id
    }).then(result => {

        if (result.deletedCount === 1) {
            res.send({
                info: "Task deleted successfully"
            })
        } else {
            res.send({
                info: "Task not found!"
            })
        }

    }).catch(e => {
        res.send(e)
    })
}