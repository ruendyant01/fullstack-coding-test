// const A = [
//     { "label": 1, "parent": null },
//     { "label": 2, "parent": 1 },
//     { "label": 3, "parent": 2 },
//     { "label": 4, "parent": 2 },
//     { "label": 5, "parent": 1 },
//     { "label": 6, "parent": 1 },
//     { "label": 7, "parent": 6 },
//     { "label": 8, "parent": 6 },
//     { "label": 9, "parent": 8 }
//   ]
  
//   const A = {
//     "label": 1, 
//     "children": [
//       {
//         "label": 2, 
//         "children": [
//           { "label": 3, "children": [] },
//           { "label": 4, "children": [] }
//         ]
//       },
//       { "label": 5, "children": [] },
//       {
//         "label": 6, 
//         "children": [
//           { "label": 7, "children": [] },
//           {
//             "label": 8, 
//             "children": [
//               { "label": 9, "children": [] }
//             ]
//           }
//         ]
//       }
//     ]
//   }

function generateTree(arr) {
  const obj = {};
  const rest = [];

  arr.forEach(({label,parent}) => {
    obj[label] = { label, children: [] };
    if (parent === null) {
      rest.push(obj[label]);
    } else {
      const parentNode = obj[parent];
      parentNode.children.push(obj[label]);
    }
  });

  return rest.length === 1 ? rest[0] : rest;
}

function flattenTree(tree) {
    const rest = [];

    function traversing(obj, parent) {
        const { label, children } = obj;
        rest.push({ label, parent });
        children.forEach(child => traversing(child, label));
    }

    traversing(tree, null);

    return rest;
}