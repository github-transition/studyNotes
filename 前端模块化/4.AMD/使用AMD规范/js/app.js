(function () {
  require.config({
    paths: {
      alerter: "./modules/alerter",
      dataServer: "./modules/dataServer",
      jquery: "./libs/jquery",
    },
  });

  require(["alerter", "jquery"], function (alerter, $) {
    alerter.showMsg();
    $("body").css("background", "red");
  });
})();
