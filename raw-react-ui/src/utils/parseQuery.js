export default function parseQuery(stringQuery) {
  const urlParams = new URLSearchParams(stringQuery);
  const query = {};
  urlParams.forEach((value, key) => {
    query[key] = value;
  });
  return query;
}
