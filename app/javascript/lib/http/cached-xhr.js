import xhr from 'xhr';

const cache = {};

export default (options, callback) => {
  const now = new Date().getTime();
  const cacheKey = options.url;
  const cachedData = cache[cacheKey];

  if (cachedData) {
    const expires = cachedData.expires;
      console.log('compare expires == now', expires, now);

    if (expires > now) {
      return callback(cachedData.error, cachedData.response, cachedData.body);
    }
  }

  xhr(options, (error, response, body) => {
    if (options.expires) {
      console.log('should expire at', new Date(options.expires))
      cache[cacheKey] = {
        expires: options.expires,
        error,
        response,
        body
      };
    }

    callback(error, response, body);
  });
};
