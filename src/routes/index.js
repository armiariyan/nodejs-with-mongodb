import express from 'express';
import {
    register,
    login,
    getUser,
    seederStatus
} from '../controllers/userController';
import {
    createTasks,
    getTasks,
    getTasksById,
    getTasksByStatus,
    updateTasks,
    updateTasksStatus,
    deleteTasks

} from '../controllers/taskController'

import {
    createStatus
} from '../controllers/statusController';

import {
    registerValidator,
    loginValidator,
    checkAuth
} from '../middleware/userValidator';
import {
    inputTaskValidator,
    adminOrAuthorOnly,
    adminOnly
} from '../middleware/taskValidator';

import {
    seeder
} from '../middleware/seeder';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome Armia');
});

// User
router.post('/register', registerValidator, register);
router.post('/login', loginValidator, seeder, login);
router.get('/user/:id', getUser);

router.post('/status', createStatus);

// Task
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTasksById);
router.get('/task/:status', getTasksByStatus);
router.post('/tasks', checkAuth, inputTaskValidator, createTasks);
router.put('/tasks/:id', checkAuth, adminOrAuthorOnly, inputTaskValidator, updateTasks);
router.put('/task/status/:id', checkAuth, adminOnly, updateTasksStatus);
router.delete('/tasks/:id', checkAuth, adminOnly, deleteTasks);



export default router;