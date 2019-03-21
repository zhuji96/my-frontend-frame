export default function moveInArray(list, from, to) {
  let res = list.slice(0, from)
    .concat(list.slice(from + 1, to + 1))
    .concat(list.slice(from, from + 1))
    .concat(list.slice(to + 1));
  return res;
}