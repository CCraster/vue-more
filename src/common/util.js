/**
 * @date: 20190919
 * @description: 通用辅助函数库
 */
export function getGistFiles(res) {
    return res.data.files;
}

export function timeValueToLocal(time) {
    let formatNum = num => {
        return num >= 10 ? num : '0' + num;
    };
    // let arr = time.split(/[^0-9]/);
    let localDate = new Date(time);
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
    );
}
