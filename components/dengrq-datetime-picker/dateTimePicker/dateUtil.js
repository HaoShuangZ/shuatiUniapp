/**
 * 日期时间格式化
 * @param {Date} date 要格式化的日期对象
 * @param {String} fmt 格式化字符串，eg：YYYY-MM-DD HH:mm:ss
 * @returns 格式化后的日期字符串
 */
function formatDate(date, fmt) {
  if (typeof date == 'string') {
    date = new Date(handleDateStr(date));
  }

  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'D+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };

  if (/([y|Y]+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').slice(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).slice(('' + o[k]).length));
    }
  }

  return fmt;
}

/**
 * 处理时间字符串，兼容ios下new Date()返回NaN问题
 * @param {*} dateStr 日期字符串
 * @returns
 */
function handleDateStr(dateStr) {
  return dateStr.replace(/\-/g, '/');
}

/**
 * 判断日期1是否在日期2之前，即日期1小于日期2
 * @param {Date} date1
 * @param {Date} date2
 * @returns
 */
function isBefore(date1, date2) {
  if (typeof date1 == 'string') {
    date1 = new Date(handleDateStr(date1));
  }
  if (typeof date2 == 'string') {
    date2 = new Date(handleDateStr(date2));
  }
  return date1.getTime() < date2.getTime();
}

/**
 * 判断日期1是否在日期2之后，即日期1大于日期2
 * @param {Date} date1
 * @param {Date} date2
 * @returns
 */
function isAfter(date1, date2) {
  if (typeof date1 == 'string') {
    date1 = new Date(handleDateStr(date1));
  }
  if (typeof date2 == 'string') {
    date2 = new Date(handleDateStr(date2));
  }
  return date1.getTime() > date2.getTime();
}

/**
 * 检查传入的字符串是否能转换为有效的Date对象
 * @param {String} date
 * @returns {Boolean}
 */
function isValid(date) {
  return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date));
}

export default {
  formatDate,
  handleDateStr,
  isBefore,
  isAfter,
  isValid
};
