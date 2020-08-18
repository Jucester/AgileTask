const express = require('express');
const router = express.Router();
// Functions for the routes
const { profile, tasks, task, renderNewTask, newTask, renderEditTask, editTask, deleteTask, invite, addUser } = require('../controllers/tasks.controller')
// Function to verify if user is not authenticated and prevent access to this routes
const { isAuthenticated } = require('../helpers/isAuth');

const { ROLE } = require('../config/roles');

const { authRole } = require('../helpers/roleCheck');


// Profile
router.get('/tasks/profile', isAuthenticated, authRole, profile);
// Tasks dashboard
router.get('/tasks', isAuthenticated, tasks);
// Individual task 
router.get('/tasks/task/:id', isAuthenticated, task);
// Route to get the view to add new task 
router.get('/tasks/new-task', isAuthenticated, renderNewTask);
// Route send the data to add a new task
router.post('/tasks/new-task', isAuthenticated, newTask);
// Route to edit the data 
router.get('/tasks/edit/:id', isAuthenticated, renderEditTask);
// Route to receive the data and change in the database
router.put('/tasks/edit/:id', isAuthenticated, editTask);
// Route to delete a task
router.delete('/tasks/delete/:id', isAuthenticated, deleteTask);
// Route to generate the invite key for partners and guest
router.put('/tasks/invite/:id', isAuthenticated, invite);


router.post('/tasks/invite', isAuthenticated, addUser);




module.exports = router;
