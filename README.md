# project-manager-backend-apis
Backend APIs for a project managing program

To run in docker 
docker-compose build; docker-compose up

To run tests, in a seperate terminal: 
npm run test

Rest APIs to create and get Users, projects and tasks
Filter Users list with optional url parameters name and surname 
Example : 
http://localhost:3000/api/users
http://localhost:3000/api/users?name=<>
http://localhost:3000/api/users?name=<>&surname=<>
http://localhost:3000/api/users?surname=<>


API Specification:

POST /api/user
name: string
surname: string,
email: a valid email address

POST: /api/project
name: string
body: string
status: ['active','inactive', 'declined', 'completed']
assignerId: a valid userId 
assigneeId: array of valid user Ids

POST: /api/task
name: string
description: string
score: integer
status: ['active','inactive', 'declined', 'completed']
assignerId: a valid userId 
assigneeId: array of valid user Ids
projectId: valid project id

GET /api/users returns list of users
Example: 
[
  {
    "id": 1,
    "name": "xlqbO5vO72",
    "surname": "OMSNxbaPsH",
    "email": "xlqbO5vO72@email.com",
    "createdAt": "2020-06-01T14:01:02.447Z",
    "updatedAt": "2020-06-01T14:01:02.878Z",
    "assignerId": 2,
    "projectId": 2,
    "taskId": 1
  },
  {
    "id": 2,
    "name": "ykn6rZFteh",
    "surname": "vt5Cidnf02",
    "email": "ykn6rZFteh@email.com",
    "createdAt": "2020-06-01T14:01:02.678Z",
    "updatedAt": "2020-06-01T14:01:02.875Z",
    "assignerId": 1,
    "projectId": 2,
    "taskId": 1
  }
]
GET /api/projects returns list of projects including assigner and assignee details 
[
  {
    "id": 2,
    "name": "xid9bOkMJp",
    "body": "mv0HPMEwNJ5jS9YR4ARc",
    "status": "active",
    "createdAt": "2020-06-01T14:01:02.726Z",
    "updatedAt": "2020-06-01T14:01:02.726Z",
    "taskId": null,
    "assigner": {
      "id": 1,
      "name": "xlqbO5vO72",
      "surname": "OMSNxbaPsH",
      "email": "xlqbO5vO72@email.com",
      "createdAt": "2020-06-01T14:01:02.447Z",
      "updatedAt": "2020-06-01T14:01:02.878Z",
      "assignerId": 2,
      "projectId": 2,
      "taskId": 1
    },
    "assignee": [
      {
        "id": 2,
        "name": "ykn6rZFteh",
        "surname": "vt5Cidnf02",
        "email": "ykn6rZFteh@email.com",
        "createdAt": "2020-06-01T14:01:02.678Z",
        "updatedAt": "2020-06-01T14:01:02.875Z",
        "assignerId": 1,
        "projectId": 2,
        "taskId": 1
      },
      {
        "id": 1,
        "name": "xlqbO5vO72",
        "surname": "OMSNxbaPsH",
        "email": "xlqbO5vO72@email.com",
        "createdAt": "2020-06-01T14:01:02.447Z",
        "updatedAt": "2020-06-01T14:01:02.878Z",
        "assignerId": 2,
        "projectId": 2,
        "taskId": 1
      }
    ]
  }
]
GET /api/tasks returns list of tasks including assigner and assignee details and project details
[
  {
    "id": 1,
    "name": "xqoG4MQDWU",
    "description": "I0RCOriIrkmOHaeOMQAA",
    "score": 40,
    "status": "active",
    "createdAt": "2020-06-01T14:01:02.803Z",
    "updatedAt": "2020-06-01T14:01:02.803Z",
    "assigner": {
      "id": 2,
      "name": "ykn6rZFteh",
      "surname": "vt5Cidnf02",
      "email": "ykn6rZFteh@email.com",
      "createdAt": "2020-06-01T14:01:02.678Z",
      "updatedAt": "2020-06-01T14:01:02.875Z",
      "assignerId": 1,
      "projectId": 2,
      "taskId": 1
    },
    "assignee": [
      {
        "id": 2,
        "name": "ykn6rZFteh",
        "surname": "vt5Cidnf02",
        "email": "ykn6rZFteh@email.com",
        "createdAt": "2020-06-01T14:01:02.678Z",
        "updatedAt": "2020-06-01T14:01:02.875Z",
        "assignerId": 1,
        "projectId": 2,
        "taskId": 1
      },
      {
        "id": 1,
        "name": "xlqbO5vO72",
        "surname": "OMSNxbaPsH",
        "email": "xlqbO5vO72@email.com",
        "createdAt": "2020-06-01T14:01:02.447Z",
        "updatedAt": "2020-06-01T14:01:02.878Z",
        "assignerId": 2,
        "projectId": 2,
        "taskId": 1
      }
    ],
    "project": {
      "id": 1,
      "name": "jFLprf1xUo",
      "body": "CVGxSUWYtTi3u698efi0",
      "status": "active",
      "createdAt": "2020-06-01T14:01:02.541Z",
      "updatedAt": "2020-06-01T14:01:02.895Z",
      "taskId": 1
    }
  }
]
The test script creates one set of values for each model populated with random strings