(function (window, dataServer) {
  let msg = "hello";
  const alerter = {
    showMsg: function () {
      alert(dataServer.getMsg() + msg);
    },
  };

  window.alerter = alerter;
})(window, dataServer);
