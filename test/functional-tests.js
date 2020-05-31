const assert = require('assert');
const axios = require('axios').default;
//var baseUrl = "http://localhost:3000"

describe('application', async () => {

  
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = `http://localhost:3000/`;
  axios.defaults.validateStatus = () => true;

  const psrand = (() => {
    let seed = 0xaabbccd;
    return () => {

      seed = (seed + 0x7ed55d16 + (seed << 12)) & 0xffffffff;
      seed = (seed ^ 0xc761c23c ^ (seed >>> 19)) & 0xffffffff;
      seed = (seed + 0x165667b1 + (seed << 5)) & 0xffffffff;
      seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
      seed = (seed + 0xfd7046c5 + (seed << 3)) & 0xffffffff;
      seed = (seed ^ 0xb55a4f09 ^ (seed >>> 16)) & 0xffffffff;
      return (seed & 0xfffffff) / 0x10000000;
    
    };
  })();

  function getRandomString(length) {
    let s = '';
    do {
      s += psrand()
        .toString(36)
        .substr(2);
    } while (s.length < length);
    s = s.substr(0, length);
    return s;
  }
  async function createRandomUser(axiosClient) {
    const newUser = {
      username: getRandomString(10),
      password: getRandomString(10),
      number: Math.floor(psrand() * 100),
    };
    const response = await axiosClient.post('/register', newUser);
    return { newUser, response };
  }
  beforeEach(async () => {
    client = axios.create();
  
  });

  afterEach(async () => {
  
  });
  describe('sanity', async () => {
    it('can successfully send an index', async () => {
      const result = await client.get('/');
      console.log(result.data)
      assert.strictEqual(result.status, 200);
    });
    it("doesn't send files that don't exist", async () => {
        const result = await client.get('doesnotexist');
        assert.strictEqual(result.status, 404);
      });
    });
});