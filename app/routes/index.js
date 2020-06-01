const express = require('express')
const bodyParser = require('body-parser')
const { User, Project} = require('../models')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    res.json("Hello")
})

app.get('/api/users', (req, res) => {
    User.findAll().then(users => res.json(users))
})

/// create a user
app.post('/api/users', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
})
// get all users
app.get('/api/users', (req, res) => {
    User.findAll().then(users => res.json(users))
})
// find blogs belonging to one user or all blogs
app.get('/api/projects/:userId?', (req, res) => {
    let query;
    if(req.params.userId) {
        query = Project.findAll({ include: [
            { model: User, where: { id: req.params.userId } },
            { model: Tag }
        ]})
    } else {
        query = Blog.findAll({ include: [Tag, User]})
    }
    return query.then(blogs => res.json(blogs))
})

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