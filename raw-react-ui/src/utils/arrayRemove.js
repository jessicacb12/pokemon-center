export default function arrayRemove(array, target) {
  if (!target) {
    return;
  }
  return array.filter(element => element !== target);
}
