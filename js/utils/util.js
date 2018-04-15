function convertRpxTpPx(rpx, screenWidth) {
  var pxPerRpx = (screenWidth / 750).toFixed(3);
  return rpx * pxPerRpx;
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function convertSecondToFormatTime(seconds) {
  var hour = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  var min = Math.floor(seconds / 60);
  var second = seconds % 60;

  if (hour > 0)
    return [hour, min, second].map(formatNumber).join(':');
  else
    return [min, second].map(formatNumber).join(':');
} 

function formatTimetoSeconds(time) {
  var times = time.split(":");
  var min = parseInt(times[0]);
  var seconds = parseInt(times[1]);
  return min*60+seconds;
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

function toUTF8Array(str) {
  var utf8 = [];
  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6),
        0x80 | (charcode & 0x3f));
    }
    else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(0xe0 | (charcode >> 12),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f));
    }
    // surrogate pair
    else {
      i++;
      // UTF-16 encodes 0x10000-0x10FFFF by
      // subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      charcode = 0x10000 + (((charcode & 0x3ff) << 10)
        | (str.charCodeAt(i) & 0x3ff))
      utf8.push(0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f));
    }
  }
  return utf8;
}

function fromUTF8Array(data) { // array of bytes
  var str = '',
    i;

  for (i = 0; i < data.length; i++) {
    var value = data[i];

    if (value < 0x80) {
      str += String.fromCharCode(value);
    } else if (value > 0xBF && value < 0xE0) {
      str += String.fromCharCode((value & 0x1F) << 6 | data[i + 1] & 0x3F);
      i += 1;
    } else if (value > 0xDF && value < 0xF0) {
      str += String.fromCharCode((value & 0x0F) << 12 | (data[i + 1] & 0x3F) << 6 | data[i + 2] & 0x3F);
      i += 2;
    } else {
      // surrogate pair
      var charCode = ((value & 0x07) << 18 | (data[i + 1] & 0x3F) << 12 | (data[i + 2] & 0x3F) << 6 | data[i + 3] & 0x3F) - 0x010000;

      str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00);
      i += 3;
    }
  }

  return str;
}

function isInteger(obj) {
  return obj % 1 === 0
}

function objToUrlParam(obj) {
  var rtn = '';
  if (typeof obj !== 'object') return '';
  for (var x in obj) {
    rtn+= x + '=' + obj[x] + '&';
  }
  return rtn;
}

function log(log) {
  var logs = wx.getStorageSync('logs') || []
  logs.unshift(log)
  wx.setStorageSync('logs', logs)
}

module.exports = {
  convertRpxTpPx: convertRpxTpPx,
  formatTime: formatTime,
  convertSecondToFormatTime: convertSecondToFormatTime,
  formatTimetoSeconds: formatTimetoSeconds,
  buf2hex: buf2hex,
  toUTF8Array: toUTF8Array,
  fromUTF8Array: fromUTF8Array,
  isInteger: isInteger,
  objToUrlParam: objToUrlParam,
  log: log
}