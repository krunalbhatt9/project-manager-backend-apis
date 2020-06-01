const assert = require('assert');
const axios = require('axios').default;

describe('application', async () => {

  
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = `http://localhost:3000/`;
  axios.defaults.validateStatus = () => true;

  function randomString(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  async function createRandomUser(axiosClient) {
    const randomName= randomString(10)
    const randomSurname= randomString(10)
    const newUser = {
      name: randomName,
      surname: randomSurname,
      email: randomName + "@email.com",
    };
    let res = await axiosClient.post('/api/users', newUser)
    return res
  }

  async function createRandomProject(axiosClient,projectStatus,assignerId) {
    const randomName= randomString(10)
    const randomBody= randomString(20)
    const newProject = {
      name: randomName,
      body: randomBody,
      status: projectStatus,
      assignerId: assignerId,
      assigneeId: [1,2,3]
    };
    let response = await axiosClient.post('/api/projects', newProject);
    return response;
  }
  async function createRandomTask(axiosClient,taskStatus,assignerId,projectId) {
    const randomName= randomString(10)
    const randomBody= randomString(20)
    const newTask = {
      name: randomName,
      description: randomBody,
      status: taskStatus,
      assignerId: assignerId,
      score: 40,
      assigneeId: [1,2,3],
      projectId: projectId
    };
    let response = await axiosClient.post('/api/tasks', newTask);
    return response;
  }

  beforeEach(async () => {
    client = axios.create();
  });

  afterEach(async () => {
  
  });
  describe('sanity', async () => {
    it('can successfully send an index', async () => {
      const result = await client.get('/api/users');
      //console.log(result.data)
      assert.strictEqual(result.status, 200);
    });
    it("doesn't send files that don't exist", async () => {
        const result = await client.get('doesnotexist');
        assert.strictEqual(result.status, 404);
    });
    it("Create a new user", async () => {
        let res = await createRandomUser(client)
        //console.log(res)
        assert.strictEqual(res.status, 200);
    });
    it("Create a new project", async () => {
      const createUserResponse  = await createRandomUser(client)
      //console.log( createUserResponse.data);
      const  createProjectResponse = await createRandomProject(client, "active",createUserResponse.data.id)
      //console.log( createProjectResponse.data);
      assert.strictEqual(createProjectResponse.status, 200);   
     });
     
     it("Create a new task", async () => {
      const createUserResponse  = await createRandomUser(client)
      //console.log( createUserResponse.data);
      const  createProjectResponse = await createRandomProject(client, "active",createUserResponse.data.id)
      //console.log( createProjectResponse.data);
      const  createTaskResponse = await createRandomTask(client, "active",createUserResponse.data.id,createProjectResponse.data.id)
      //console.log( createTaskResponse.data);
      assert.strictEqual(createTaskResponse.status, 200);   
     });
  });
});