/**
 * fake Json数据
 * @param {number} num 节点个数
 * @param {number} depth 最大深度
 */
export const fakeJsonData = (num, depth) => {
  let splitArr = [],
    jsonObj = {}

  let getDepthObj = (num, startIndex) => {
    let obj = {},
      start = num
    while (start > 0) {
      if (start === num) {
        obj = {
          ['num' + (start + startIndex - 1)]: 'value' + (start + startIndex - 1)
        }
      } else {
        obj = { ['num' + (start + startIndex - 1)]: obj }
      }
      start--
    }
    return obj
  }

  if (depth > num) {
    return jsonObj
  } else if (depth === num) {
    return getDepthObj(num, 1)
  }

  let tempNum = num - depth,
    hasPush = false
  while (tempNum > 0) {
    let random = Math.floor(Math.random() * depth) + 1
    if (random > tempNum) {
      random = tempNum
    }
    splitArr.push(random)
    tempNum -= random
    if (tempNum < (num - depth) / 2 && !hasPush) {
      splitArr.push(depth)
      hasPush = true
    }
  }

  let startIndex = 1
  splitArr.forEach(d => {
    if (d === 1) {
      jsonObj = {
        ...jsonObj,
        ['num' + startIndex]: 'value' + startIndex
      }
    } else {
      jsonObj = {
        ...jsonObj,
        ...getDepthObj(d, startIndex)
      }
    }
    startIndex += d
  })

  return jsonObj
}

/**
 * 把json对象解析深度优先解析成数组
 * @param {object} jsonData json对象
 */
export const JsonObjectToTreeList = jsonData => {
  let treeList = []
  const getTreeNodeRecursive = (obj, depth) => {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        treeList.push({
          key,
          value: {},
          depth
        })
        getTreeNodeRecursive(obj[key], depth + 1)
      } else {
        treeList.push({
          key,
          value: obj[key],
          depth,
          isLeaf: true
        })
      }
    }
  }
  getTreeNodeRecursive(jsonData, 1)
  return treeList
}

/**
 * 根据数组还原出json对象
 * @param {array} treeList tree节点数据，深度优先
 */
export const treeList2JsonObject = treeList => {
  let stack = [{ value: {}, depth: 0 }]
  treeList.forEach(node => {
    if (node.depth > stack[stack.length - 1].depth) {
      if (node.isLeaf) {
        stack[stack.length - 1]['value'][node.key] = node.value
      } else {
        stack.push(node)
      }
    } else if (node.depth === stack[stack.length - 1].depth) {
      let pop = stack.pop()
      stack[stack.length - 1]['value'][pop.key] = pop.value
      if (node.isLeaf) {
        stack[stack.length - 1]['value'][node.key] = node.value
      } else {
        stack.push(node)
      }
    } else {
      while (stack[stack.length - 1].depth >= node.depth) {
        let pop = stack.pop()
        stack[stack.length - 1]['value'][pop.key] = pop.value
      }
      if (node.isLeaf) {
        stack[stack.length - 1]['value'][node.key] = node.value
      } else {
        stack.push(node)
      }
    }
  })
  if (stack.length > 1) {
    let pop = stack.pop()
    stack[stack.length - 1]['value'][pop.key] = pop.value
  }
  return stack[0].value
}

// const a = {
//   a: {
//     a1: 'a1',
//     a2: {
//       a3: 'a3'
//     },
//     a4: 'a4',
//     a5: {
//       a6: 'a6'
//     },
//     a7: {
//       a8: 'a8'
//     }
//   },
//   b: {
//     b2: 'b2',
//     b1: 'b1'
//   }
// }
// const arr = [
//   a,
//   {},
//   {
//     a: 1
//   },
//   {
//     a: 1,
//     b: 2
//   },
//   {
//     a: 1,
//     b: {
//       b1: 2,
//       b2: {
//         b22: 1
//       },
//       b3: 3
//     },
//     c: {
//       c1: 1
//     },
//     d: 1
//   }
// ]

// console.log(a)
// console.log(JsonObjectToTreeList(a))
// console.log(
//   JSON.stringify(a) ===
//     JSON.stringify(treeList2JsonObject(JsonObjectToTreeList(a)))
// )

// arr.forEach(d => {
//   console.log(
//     JSON.stringify(d) ===
//       JSON.stringify(treeList2JsonObject(JsonObjectToTreeList(d)))
//   )
// })
