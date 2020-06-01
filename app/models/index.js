const Sequelize = require('sequelize')
const UserModel = require('./user.model')
const ProjectModel = require('./project.model')
const TaskModel = require('./task.model')

const sequelize = new Sequelize('postgres://user:pass@postgres:5432/db');
sequelize.authenticate().then(function(errors) { console.log(errors) });

const User = UserModel(sequelize, Sequelize)
const Project = ProjectModel(sequelize, Sequelize)
const Task = TaskModel(sequelize, Sequelize)

Project.hasOne(User, {as: 'assigner'})
Project.hasMany(User, {as: 'assignee'})

Task.hasOne(User, {as: 'assigner'})
Task.hasMany(User, {as: 'assignee'})
Task.hasOne(Project)

sequelize.sync({ force: true })
  .then(() => console.log('Database & tables created!'))
  .catch (err => console.log('Error'+ err))

module.exports = {
  User,
  Project,
  Task
}