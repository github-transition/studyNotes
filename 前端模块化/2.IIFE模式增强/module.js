(function (window, $) {
  const data = "zjh";
  const foo = function () {
    console.log("foo was be called", data);
    $("body").css("background", "red");
  };
  window.module = {
    foo,
  };
})(window, jQuery);
