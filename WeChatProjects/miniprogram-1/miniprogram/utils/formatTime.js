var formatTime =  (timestamp) => {
  // 补全为13位
  var arrTimestamp = (timestamp + '').split('');
  for (var start = 0; start < 13; start++) {
      if (!arrTimestamp[start]) {
          arrTimestamp[start] = '0';
      }
  }
  timestamp = arrTimestamp.join('') * 1;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - timestamp;

  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
      return '不久前';
  }
  // 计算差异时间的量级
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;

  // 数值补0方法
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  // 使用
  if (monthC > 4) {
      // 超过1年，直接显示年月日
      return (function () {
          var date = new Date(timestamp);
          return date.getFullYear() + '年' + formatNumber(date.getMonth() + 1) + '月' + formatNumber(date.getDate()) + '日';
      })();
  } else if (monthC >= 1) {
      return parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
      return parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
      return parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
      return parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
      return parseInt(minC) + "分钟前";
  }
  return '刚刚';
};
// console.log(dateDiff(1560387311));  // 2014年09月19日
// console.log(dateDiff(1560400790));  // 9月前
// console.log(dateDiff(1550062750));  // 2月前
// console.log(dateDiff(1547384350));  // 3周前
// console.log(dateDiff(1505283100802));  // 1分钟前
module.exports = {
  formatTime: formatTime
} 