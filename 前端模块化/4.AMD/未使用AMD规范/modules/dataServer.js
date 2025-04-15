(function (window) {
  const str = "zjh：";

  const dataServer = {
    getMsg: function () {
      return str.toUpperCase();
    },
  };

  window.dataServer = dataServer;
})(window);
