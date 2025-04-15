define(["dataServer"], function (dataServer) {
  let msg = "hello";
  function showMsg() {
    alert(dataServer.getMsg() + msg);
  }
  return { showMsg };
});
