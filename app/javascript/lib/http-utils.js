import xhr from 'xhr';

const BASE_URL = 'http://localhost:5001';
const API_KEY = '';

export function request(options, callback) {
  options.url = `${BASE_URL}/${options.url}?api_key=${API_KEY}`;

  xhr(options, (error, response, body) => {
    if (response && body && Object.prototype.toString.call(body) === '[object String]') {
      let contentType = response.headers['content-type'];

      if (contentType && contentType.indexOf('application/json') > -1) {
        try { body = JSON.parse(body); }
        catch (e) {}
      }
    }
    if (callback) {
      callback(error, response, body);
    }
  });
}

export function requestGet(path, callback) {
  request({
    method: 'GET',
    url: path
  }, callback);
}
