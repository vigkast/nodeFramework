var jsonservicemod = angular.module('jsonservicemod', ["templateservicemod"]);
jsonservicemod.service('JsonService', function ($http, TemplateService, $state) {
  this.json = {};
  this.keyword = {};
  var JsonService = this;
  this.setKeyword = function (data) {
    try {
      this.keyword = JSON.parse(data);
      console.log(this.keyword);
    } catch (e) {
      console.log("keyword is not is json format");
    }
  };
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

  this.eventAction = function (action, value) {
    if (action && action.type == "page") {
      var sendTo = {
        id: action.action
      };
      if (value && action && action.fieldsToSend) {
        var keyword = {};
        _.each(action.fieldsToSend, function (n, key) {
          keyword[key] = value[n];
        });
        sendTo.keyword = JSON.stringify(keyword);
      }
      $state.go("page", sendTo);
    }
  };


});