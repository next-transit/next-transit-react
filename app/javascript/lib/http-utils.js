import xhr from 'xhr';

let API_URL;
let API_KEY;

export function setSettings(settings) {
  if (settings) {
    API_URL = settings.api_url;
    API_KEY = settings.api_key;
  }
}

export function request(options, callback) {
  if (!API_URL || !API_KEY) return console.error('API settings aren\'t available');

  options.url = `${API_URL}/${options.url}?api_key=${API_KEY}`;

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
