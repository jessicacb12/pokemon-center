module.exports = function middlewarePromise(asyncMiddleware, request) {
  return new Promise((resolve, reject) => {
    asyncMiddleware(request, {}, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};
