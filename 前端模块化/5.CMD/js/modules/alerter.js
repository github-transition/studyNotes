define(function (require, exports, module) {
  let data = require("./dataServer");
  function alerter() {
    alert(data.getMsg() + "hhh");
  }
  module.exports = { alerter };
});
