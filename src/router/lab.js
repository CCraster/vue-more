/**
 * 配置实验室每个unit的信息，生成路由
 */

const Lab = () => import('@/views/lab')
const LAB_ROUTE_PREFIX = '/home/lab/' // 路由path前缀

// 每个unit元信息
const UNIT_LIST = [
  {
    folderName: 'ScrollAnimation', // 每个unit📁的名称
    cname: '滚动动画' // 中文名称
  },
  {
    folderName: 'InfiniteTree',
    cname: '无限级Tree'
  }
]

// 根据unit元信息，生成unit路由
export const UNIT_LIST_PATH = UNIT_LIST.map(item => {
  return {
    ...item,
    path: LAB_ROUTE_PREFIX + item.folderName,
    component: () => import(`@/views/lab/units/${item.folderName}`)
  }
})

// LAB完整路由
export const LAB_ROUTE = {
  path: LAB_ROUTE_PREFIX,
  component: Lab,
  children: UNIT_LIST_PATH
}
