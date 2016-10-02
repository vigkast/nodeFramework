var jsonservicemod = angular.module('jsonservicemod', ["templateservicemod"]);
jsonservicemod.service('JsonService', function ($http, TemplateService, $state) {
  this.json = {};
  var JsonService = this;
  this.getJson = function (page, callback) {
    $http.get("pageJson/" + page + ".json").success(function (data) {
      JsonService.json = data;
      switch (data.pageType) {
        case "view":
          {
            TemplateService.changecontent("view");
          }
          break;

        case "create":
          {
            TemplateService.changecontent("detail");
          }
          break;

        case "edit":
          {
            TemplateService.changecontent("detail");
          }
          break;
      }
      callback();
    });

  };

  this.eventAction = function (action) {
    if (action.type == "page") {
      $state.go("page", {
        id: action.action
      });
    }
  };


});