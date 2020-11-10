
export default function stringFromat(format, values = {}) {
  let result = format;
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(new RegExp("\\{" + key + "\\}", "g"), value);
  }
  result = result.replace(new RegExp("\\{[a-zA-Z0-9]+\\}", "g"), "");
  return result;
}
