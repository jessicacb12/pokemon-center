const supertest = require("supertest");
const app = require("../../app");
const {
  serializeQuery,
  normalizeUrl,
} = require("../../utils");

class Requester {
  constructor({
    mainPath = "/",
    query = {},
    data = {},
    headers = {},
  } = {}) {
    this.mainPath = mainPath;
    this.query = query;
    this.data = data;
    this.headers = headers;
  }


  async get(path, query = {}, options = {}) {
    options.query = {
      ...this.query,
      ...query,
    };
    options.path = `${this.mainPath}/${path}`;
    options.method = "get";
    options.headers = {
      ...this.headers,
      ...options.headers,
    };
    return request(options);
  }

  async post(path, data = {}, options = {}) {
    options.data = {
      ...this.data,
      ...data,
    };
    options.path = `${this.mainPath}/${path}`;
    options.method = "post";
    options.query = {
      ...this.query,
    };
    options.headers = {
      ...this.headers,
      ...options.headers,
    };
    return request(options);
  }

  async put(path, data = {}, options = {}) {
    options.data = {
      ...this.data,
      ...data,
    };
    options.path = `${this.mainPath}/${path}`;
    options.method = "put";
    options.query = {
      ...this.query,
    };
    options.headers = {
      ...this.headers,
      ...options.headers,
    };
    return request(options);
  }

  async delete(path, options = {}) {
    options.path = `${this.mainPath}/${path}`;
    options.method = "delete";
    options.query = {
      ...this.query,
    };
    options.headers = {
      ...this.headers,
      ...options.headers,
    };
    return request(options);
  }
}
Object.assign(Requester, {
  request,
  get,
  post,
  put,
  delete: del,
});

async function request(options = {}) {
  const {
    path = "/",
    method = "get",
    query = {},
    data = {},
    headers = {},
  } = options;
  const stringQuery = serializeQuery(query);
  const requestPath = normalizeUrl(`/${path}${stringQuery}`);

  let requestSetting = supertest(app)[method](requestPath);
  const headerEntries = Object.entries(headers);
  for (let i = 0; i < headerEntries.length; i += 1) {
    const headerName = headerEntries[i][0];
    const headerValue = headerEntries[i][1];
    requestSetting = requestSetting.set(headerName, headerValue);
  }
  const result = await requestSetting.send(data);
  return result;
}

async function get(path, query = {}, options = {}) {
  options.query = query;
  options.path = path;
  options.method = "get";
  return request(options);
}
async function post(path, data = {}, options = {}) {
  options.data = data;
  options.path = path;
  options.method = "post";
  return request(options);
}

async function put(path, data = {}, options = {}) {
  options.data = data;
  options.path = path;
  options.method = "put";
  return request(options);
}

async function del(path, options = {}) {
  options.path = path;
  options.method = "delete";
  return request(options);
}


module.exports = Requester;
