export default function(...urls) {
  let result = urls[0] || "/";
  for (let i = 1; i < urls.length; i++) {
    result += "/" + urls[i];
  }
  result = result.replace(/([^:]\/)\/+/g, "$1");
  if (result.startsWith("/")) {
    result = result.replace(/\/\//g, "/");
  }
  return result;
}
