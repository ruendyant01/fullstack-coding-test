export function generateTree(arr, save=null) {
  const obj = {};
  const rest = [];

  arr.forEach(({ name, parent }) => {
    if(parent === "null") parent = null;
    obj[name] = { name, children: [] };
    if (parent == null) {
      rest.push(obj[name]);
    } else { 
      const parentNode = obj[parent];
      parentNode.children.push(obj[name]);
    }
  });

  return rest.length === 1 ? rest[0] : rest;
}

function flattenTree(tree) {
  const rest = [];

  function traversing(obj, parent) {
    const { name, children } = obj;
    rest.push({ name, parent });
    children.forEach((child) => traversing(child, name));
  }

  traversing(tree, null);

  return rest;
}

function normalizeObjectToArr(data) {
  return Object.keys(data).map(val => data[val]);
}

export function treeFormating(tree) {
    const trees = flattenTree(tree);
    return generateTree(trees);
}

export function saveTreeFormating(arr) {
  const dataArr = normalizeObjectToArr(arr);
  const rest = generateTree(dataArr);
  return rest;
}