/**
 * @date: 20190919
 * @description: 通用辅助函数库
 */
/* 获取gist的files数据，并把content转换为对象 */
export function getGistFiles(res) {
  let files = res.data.files
  for (let key in files) {
    files[key].content = JSON.parse(files[key].content)
  }
  return files
}

export function timeValueToLocal(time) {
  let formatNum = num => {
    return num >= 10 ? num : '0' + num
  }
  // let arr = time.split(/[^0-9]/);
  let localDate = new Date(time)
  // let localDate = new Date(worldDate.getTime() + 8 * 60 * 60 * 1000);
  return (
    formatNum(localDate.getFullYear()) +
    '-' +
    formatNum(localDate.getMonth() + 1) +
    '-' +
    formatNum(localDate.getDate()) +
    ' ' +
    formatNum(localDate.getHours()) +
    ':' +
    formatNum(localDate.getMinutes()) +
    ':' +
    formatNum(localDate.getSeconds())
  )
}

/* 对todolist数据按year, month, week, day四种模式组装数组 */
export function formatTodolistData(originTodolistData, mode, searchWord) {
  let originTodolistDeepCopy = JSON.parse(JSON.stringify(originTodolistData)), // 简单深拷贝
    todolistItems = originTodolistDeepCopy.todolistContent,
    transformdItems = {}
  todolistItems.forEach((item, index) => {
    if (searchWord && item.itemContent.indexOf(searchWord) < 0) return // 不含有searchWord则跳出本次循环
    let getKey = getKeyByMode(item.createdTime, mode)
    if (!transformdItems[getKey]) {
      // console.log(item);
      transformdItems[getKey] = {
        title: getKey,
        items: [],
        createdTime: Number.MAX_SAFE_INTEGER,
        lastModifiedTime: Number.MIN_SAFE_INTEGER
      }
    }
    item['originIndex'] = index
    if (item.createdTime < transformdItems[getKey].createdTime) {
      transformdItems[getKey].createdTime = item.createdTime
    }
    if (item.lastModifiedTime > transformdItems[getKey].lastModifiedTime) {
      transformdItems[getKey].lastModifiedTime = item.lastModifiedTime
    }
    transformdItems[getKey].items.push(item)
  })
  // console.log(transformdItems);
  // transformdItems = sortDescend(transformdItems); // 按时间小到大排序
  originTodolistDeepCopy.todolistContent = transformdItems // 把组装好的items，赋值给todolistContent
  return originTodolistDeepCopy

  /* 根据日期和模式，给出对应的key结果 */
  function getKeyByMode(timeValue, mode) {
    let modeList = {
      year: time => {
        return new Date(time).getFullYear() + '年'
      },
      month: time => {
        let date = new Date(time),
          length = 2
        return `${date.getFullYear()}年${(
          Array(length).join('0') +
          (date.getMonth() + 1)
        ).slice(-length)}月`
      },
      week: time => {
        var date = new Date(time)
        var firstDay = new Date(date.getFullYear(), 0, 1)
        var dayOfWeek = firstDay.getDay()
        var spendDay = 1
        if (dayOfWeek != 0) {
          spendDay = 7 - dayOfWeek + 1
        }
        firstDay = new Date(date.getFullYear(), 0, 1 + spendDay)
        var d = Math.ceil((date.valueOf() - firstDay.valueOf()) / 86400000)
        var result = Math.ceil(d / 7)
        return `${date.getFullYear()}年第${result + 1}周`
      },
      day: time => {
        let date = new Date(time),
          length = 2
        return `${date.getFullYear()}年${(
          Array(length).join('0') +
          (date.getMonth() + 1)
        ).slice(-length)}月${(Array(length).join('0') + date.getDate()).slice(
          -length
        )}日`
      }
    }
    return modeList[mode](timeValue)
  }
  /* Object转换为数组，按键值递增 */
  // function sortDescend(todolistObject) {
  //     let keys = Object.keys(todolistObject),
  //         todolistArray = [];
  //     for (let i = keys.length - 1; i >= 0; i--) {
  //         todolistArray.push(todolistObject[keys[i]]);
  //     }
  //     return todolistArray;
  // }
}

/**
 * 节流函数
 * @param {*} fn
 * @param {*} time
 */
export const throttle = (fn, interval = 300) => {
  let startTimestamp = 0

  return function() {
    let context = this
    let args = arguments
    let now = +Date.now()

    if (now - startTimestamp > interval) {
      startTimestamp = now
      fn.apply(context, args)
    }
  }
}

/**
 * 根据路径数据path，从obj取出对应值
 * @param {*} obj
 * @param {array} path
 */
export const getValueFromPath = (obj, path) => {
  let result = obj
  path.forEach(item => {
    result = result[item]
  })
  return result
}
