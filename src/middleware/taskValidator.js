import Validator from 'fastest-validator';
import Task from '../models/Task';

export const inputTaskValidator = async (req, res, next) => {
    const task = new Task(req.body);

    // Validasi data menggunakan fastest-validator
    const schema = {
        task: {
            type: "string",
            optional: false,
            max: "100"
        },
        completed: {
            type: "boolean",
            optional: false
        }
    }

    // Inisiasi dan Validasi inputan user terhadap schema
    const v = new Validator();
    const validationResponse = v.validate(task, schema);

    // Jika validasi tidak true maka kembalikan error
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    } else {
        // Validasi apakah user sudah terdaftar

        next()
    }



}

export const adminOnly = async (req, res, next) => {

    const tasks = await Task.findById(req.params.id)
        .populate('userId', '_id username email Type')
        .exec()
    // userData dikirim dari middleware checkAuth yg decoded token jwt
    const loggedUserType = req.userData.Type;

    if (loggedUserType === "admin") {
        console.log("Logged in as Admin");
        next();
    } else {
        res.send({
            info: "Only admin can do this request!"
        })
    }









}

export const adminOrAuthorOnly = async (req, res, next) => {

    const tasks = await Task.findById(req.params.id)
        .populate('userId', '_id username email Type')
        .exec()
    // membuat variable user id pemilik task
    const userIdTask = tasks.userId[0]._id;

    // userData dikirim dari middleware checkAuth yg decoded token jwt
    const loggedUserId = req.userData.userId;
    const loggedUserType = req.userData.Type;



    if (loggedUserType === "admin") {
        console.log("Logged in as Admin");
        next();
    } else if (userIdTask != loggedUserId) {
        res.send("Only Author of the task can edit their post!");
    } else {
        next()
    }









}