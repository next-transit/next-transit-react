import xhr from 'xhr';

let API_URL;
let API_KEY;

function getQueryParams(options) {
  const params = Object.assign({ api_key:API_KEY }, options.params);
  const paramsArray = Object.keys(params).map((key) => `${key}=${params[key]}`);
  return paramsArray.join('&');
}

export function setSettings(settings) {
  if (settings) {
    API_URL = settings.api_url;
    API_KEY = settings.api_key;
  }
}

export function request(options, callback) {
  if (!API_URL || !API_KEY) return console.error('API settings aren\'t available');

  if (typeof options === 'string') {
    options = {
      url: options
    };
  }

  const paramsString = getQueryParams(options);

  options.method = options.method || 'GET';

  options.url = `${API_URL}/${options.url}?${paramsString}`;

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
