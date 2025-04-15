(function (window) {
  const data = "zjh";
  const foo = function () {
    console.log("foo was be called", data);
  };
  const bar = function () {
    console.log("bar was be called", data);
  };
  window.module = {
    foo,
    bar,
  };
})(window);
