const express = require('express')
const bodyParser = require('body-parser')
const { User, Project, Task} = require('../models')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    res.json("Hello")
})

app.get('/api/users', (req, res) => {
    const nameq = req.query.name ? {name: req.query.name} : {}
    const surnameq = req.query.surnname ? {surname: req.query.surname} : {}

    User.findAll({
        where: nameq ,surnameq
        }).then(users => res.json(users))
})
/// create a user
app.post('/api/users', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
})
app.post('/api/projects', (req, res) => {
    Project.create(req.body)
        .then(project =>{
        User.findOne({id: req.body.assignerId}).then ( user => {
        project.setAssigner(user)
        User.findAll({id: [req.body.assigneeId]}).then ( users => {
        project.setAssignee(users)
        res.json(project)
        });
        });
    });
})

app.post('/api/tasks',  (req, res) => {
    Task.create(req.body)
        .then(task =>{
        User.findOne({id: req.body.assignerId})
        .then ( user => {task.setAssigner(user)})
        User.findAll({id: [req.body.assigneeId]}).
        then ( users => { task.setAssignee(users)})
        Project.findOne({id: [req.body.projectId]}).
        then ( project => { task.setProject(project)})
        res.json(task)
    });
})

app.get('/api/tasks', (req, res) => {
    Task.findAll({include: [{ model: User, as: 'assigner'},{ model: User, as: 'assignee'}, {model:Project}]})
        .then(project =>{
        res.json(project)
        });
})
app.get('/api/projects', (req, res) => {
    Project.findAll({include: [{ model: User, as: 'assigner'},{ model: User, as: 'assignee'}]})
        .then(project =>{
        res.json(project)
        });
})
app.get('/api/users', (req, res) => {
    Project.findAll({include: User},{where: { id: req.params.userId} } ).then(projects => res.json(projects))
})


// // find blogs belonging to one user or all blogs
// app.get('/api/projects/:userId?', (req, res) => {
//     let query;
//     if(req.params.userId) {
//         query = Project.findAll({ include: [
//             { model: User, where: { id: req.params.userId } },
//             { model: Tag }
//         ]})
//     } else {
//         query = Blog.findAll({ include: [Tag, User]})
//     }
//     return query.then(blogs => res.json(blogs))
// })

// find blogs belonging to one user or all blogs
// app.get('/api/projects/:userId?', (req, res) => {
//     // let query;
//     // if(req.params.userId) {
//     //     query = Project.findAll({ include: [
//     //         { model: User, where: { id: req.params.userId } },
//     //     ]})
//     // } else {
//     //     query = Project.findAll({ include: [User]})
//     // }
//     // return query.then(projects => res.json(projects))
//     let query = Project.findAll({ fetchAssociations: true, include:[{User, as: 'Assigner'}, {User, as: 'AssigneesList'}]})
//     return query.then ( projects=> res.json(projects))

// })

// // find blogs by tag
// app.get('/api/projects/:tag/tag', (req, res) => {
//     Blog.findAll({
//         include: [
//             { model: Tag, where: { name: req.params.tag } }
//         ]
//     })
//     .then(blogs => res.json(blogs))
// })
module.exports = app;