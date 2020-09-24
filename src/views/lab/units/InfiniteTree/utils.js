import uuidv4 from 'uuid'
import randomCName from 'chinese-random-name'
import { getValueFromPath } from '@/utils/util.js'

export const generateTreeNode = name => {
  return {
    id: uuidv4(),
    name: name || randomCName.generate(),
    state: {
      opened: true,
      disabled: false,
      selected: false
    },
    children: []
  }
}

/**
 * fake Tree Json数据，只有2层
 * @param {number} num_l1 一级节点个数
 * @param {number} num_l2_max 二级节点最大个数
 */
export const fakeTreeJsonData = (num_l1, num_l2_max) => {
  let startTime = Date.now()
  let treeJson = []

  for (let i = 0; i < num_l1; i++) {
    let random = Math.floor(Math.random() * (num_l2_max + 1))
    let tempNode = generateTreeNode()
    tempNode.children = new Array(random).fill(0).map(() => {
      return generateTreeNode()
    })
    treeJson.push(tempNode)
  }
  console.log('fakeTreeJsonData', ' cost: ', Date.now() - startTime, 'ms')

  return treeJson
}

/**
 * 把tree json对象解析深度优先解析成数组
 * @param {array} treeJson
 */
export const treeJson2List = treeJson => {
  let startTime = Date.now()
  let treeList = []
  const getTreeNodeRecursive = (tree, path) => {
    tree.forEach((node, index) => {
      const { id, name, state } = node
      let tempNode = {
        id,
        name,
        state,
        path: [...path, index]
      }
      if (node.children.length > 0 && state.opened) {
        treeList.push(tempNode)
        getTreeNodeRecursive(node.children, [...path, index, 'children'])
      } else if (node.children.length > 0 && !state.opened) {
        treeList.push(tempNode)
      } else {
        treeList.push({ ...tempNode, isLeaf: true })
      }
    })
  }

  getTreeNodeRecursive(treeJson, [])
  console.log('treeJson2List', ' cost: ', Date.now() - startTime, 'ms')
  return treeList
}

/**
 * 将obj的子节点的state.attr设置为value
 * @param {*} obj
 * @param {*} attr
 * @param {*} value
 */
export const setChildrenStatus = (obj, attr, value) => {
  let startTime = Date.now()
  obj.state[attr] = value
  if (obj.children.length > 0) {
    obj.children.forEach(item => {
      setChildrenStatus(item, attr, value)
    })
  }
  console.log('setChildrenStatus', ' cost: ', Date.now() - startTime, 'ms')
}

/**
 * 更改祖先节点的选中状态
 * @param {*} obj
 * @param {*} path
 * @param {*} value
 */
export const checkAncestorStatus = (obj, path, value) => {
  let startTime = Date.now()
  let length = path.length
  for (let i = length; i > 0; i--) {
    let tempNode = getValueFromPath(obj, path.slice(0, i))

    if (Array.isArray(tempNode)) continue

    if (
      tempNode.children[value ? 'every' : 'some'](
        item => item.state.selected === value
      )
    ) {
      tempNode.state.selected = value
    } else {
      break
    }
  }
  console.log('checkAncestorStatus', ' cost: ', Date.now() - startTime, 'ms')
}

/**
 * --------- 弃用
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
