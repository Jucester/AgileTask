const crypto = require('crypto');
const Tasks = require('../models/tasks');
// Added User models to add the task to the team_tasks array in db
const User = require('../models/user');
const { ROLE } = require('../config/roles');

const controller = {};
const errors = [];

controller.profile = (req, res, next) => {
    console.log( ROLE )
    res.render('tasks/profile');
};

controller.tasks = async (req, res, next) => {
  
    const tasks = await Tasks.find({user: {$elemMatch: { id: req.user.id}}}).sort({date: 'desc'});    
    const invite = await Tasks.find( {team: { $elemMatch: { id: req.user.id }}});
   
    res.render('tasks/tasks', { tasks, invite }); 

};

controller.task = async (req, res, next) => {
    console.log(req.params.id)
    const task = await Tasks.findById(req.params.id);
    res.render('tasks/task', { task });
};

controller.renderNewTask = (req, res, next) => {
    res.render('tasks/new-task', {
        errors
    });
};

controller.newTask = async (req, res, next) => {
    console.log(req.body)
    const { title, description, steps } = req.body;
    
    
    if(!title) {
        errors.push({text: 'Please write a title'});
    }
    if (!description) {
        errors.push({text: 'Please write a description'});
    }
    if(errors.length > 0){
        console.log(errors, errors.length)
        res.render('tasks/new-task', {
            errors,
            title,
            description
        });
    }

    else {
        const newTasks = new Tasks({ title, description, steps });
        newTasks.user = { id: req.user.id, name: req.user.username };
        newTasks.team = { id: req.user.id, name: req.user.username, role: 'owner'}
        await newTasks.save();

        req.flash('success', 'Tarea añadida!')
        res.redirect('/tasks');
    }
};

controller.renderEditTask = async (req, res, next) => {
    const task = await Tasks.findById(req.params.id)
    console.log(task)

    res.render('tasks/edit-task', { task } );
  
};

controller.editTask = async (req, res, next) => {
    const { title, description } = req.body;
    await Tasks.findByIdAndUpdate(req.params.id, { title, description});
    req.flash('success', 'Editado exitosamente')
    res.redirect('/tasks')

};

controller.deleteTask = async (req, res, next) => {
    await Tasks.findByIdAndDelete(req.params.id)
    req.flash('success', 'Eliminado exitosamente')
    res.redirect('/tasks');
};

controller.invite = async (req, res, next) => {
    await crypto.randomBytes(48, async function(err, buffer) {

        if (err) console.log(err);
        let key = buffer.toString('base64');
        await Tasks.findByIdAndUpdate(req.params.id, { key });
        req.flash('success', 'Key de invitación creada exitosamente.')
        res.redirect('/tasks');

    })
};

controller.addUser = async (req, res, next) => {
  
    const task = await Tasks.findOneAndUpdate({ key: req.body.inviteKey }, { $push: { team: { id: req.user.id, name: req.user.username ,role: 'guest'} } });
    await User.findByIdAndUpdate(req.user.id, { $push: { team_tasks: { name: task.title, id: task.id, role: 'guest' }}});
    req.flash('success', 'Has aceptado la invitación a la tarea');
    res.redirect('/tasks/profile');
    
};

module.exports = controller;