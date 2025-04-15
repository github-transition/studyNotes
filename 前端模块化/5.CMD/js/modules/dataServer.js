define(function (require, exports, module) {
  let msg = "www.baidu.com";
  function getMsg() {
    return msg.toUpperCase();
  }
  module.exports = { getMsg };
});
