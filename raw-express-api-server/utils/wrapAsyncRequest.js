module.exports = function wrapAsyncRequest(handler, hasNext = false) {
  return function wrappedHandler(req, res, next) {
    const resultPromise = handler(req, res, next);
    if (resultPromise && resultPromise.then) {
      resultPromise.then((result) => {
        if (hasNext) next();
        else if (typeof (result) === "object") res.json(result);
        else res.end(result);
      }, next);
    }
    return resultPromise;
  };
};
