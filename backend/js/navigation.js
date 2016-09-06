// var adminurl = "http://104.199.151.75:82/";
if (adminurl || adminurl !== "") {
    console.log(adminurl);
} else {
    adminurl = "http://localhost:1337/api/";
}
var imgpath = adminurl + "upload/readFile";
var uploadurl = adminurl + "upload/";

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
        name: "Users",
        classis: "active",
        link: "#/page/userView",
        subnav: []
    }, {
        name: "Movies",
        classis: "active",
        link: "#/page/viewMovie",
        subnav: []
    }, {
        name: "News",
        classis: "active",
        link: "#/page/viewNews",
        subnav: []
    }, {
        name: "Awards",
        classis: "active",
        link: "#/page/viewNewAward",
        subnav: []
    }, {
        name: "Dharma tv",
        classis: "active",
        link: "#/page/viewDharmatv",
        subnav: []
    }, {
        name: "Dharma Journey",
        classis: "active",
        link: "#/page/viewJourney",
        subnav: []
    }, {
        name: "Dharma tv Home",
        classis: "active",
        link: "#/page/viewDharmaHome",
        subnav: []
    }, {
        name: "Dharma tv Slider",
        classis: "active",
        link: "#/page/viewDharmaSlider",
        subnav: []
    }, {
        name: "Home Slider",
        classis: "active",
        link: "#/page/viewHomeSlider",
        subnav: []
    }, {
        name: "Popular Tags",
        classis: "active",
        link: "#/page/viewTag",
        subnav: []
    }, {
        name: "Dharma 140",
        classis: "active",
        link: "#/page/viewDharma140",
        subnav: []
    }, {
        name: "Dharma And You Family",
        classis: "active",
        link: "#/page/viewDharmaAnswerUser",
        subnav: []
    }, {
        name: "Dharma And You Questions",
        classis: "active",
        link: "#/page/viewDharmaNYou",
        subnav: []
    }, {
        name: "Dharma Insta",
        classis: "active",
        link: "#/page/viewDharmaInsta",
        subnav: []
    }, {
        name: "Config",
        classis: "active",
        link: "#/page/viewConfig",
        subnav: []
    }, {
        name: "Subscribe",
        classis: "active",
        link: "#/page/viewSubscribe",
        subnav: []
    }];

    return {
        getnav: function() {
            return navigation;
        },
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        saveApi: function(data, apiName, successCallback, errorCallback) {
            $http.post(adminurl + apiName, data).success(successCallback).error(errorCallback);
        },
        deleteProject: function(data, successCallback, errorCallback) {
            $http.post(adminURL + "project/delete", data).success(successCallback).error(errorCallback);
        },
        findProjects: function(apiName, pagination, successCallback, errorCallback) {
            $http.post(adminurl + apiName, pagination).success(successCallback).error(errorCallback);
        },
        findOneProject: function(apiName, urlParams, successCallback, errorCallback) {
            console.log(adminurl + apiName);
            $http.post(adminurl + apiName, urlParams).success(successCallback).error(errorCallback);
        },
        sideMenu1: function(apiName, pagination, successCallback, errorCallback) {
            $http.post(adminurl + apiName, pagination).success(successCallback).error(errorCallback);
        },
        submitLogin: function(data, successCallback, errorCallback) {
            $http.post(adminurl + "register/login", data).success(successCallback).error(errorCallback);
        },
        deleteApi: function(data, successCallback, errorCallback) {
            $http.post(adminURL + "api/delete", data).success(successCallback).error(errorCallback);
        },
        getDropDown: function(apiName, successCallback, errorCallback) {
            $http.post(adminurl + apiName).success(successCallback).error(errorCallback);
        },
        logout: function(successCallback, errorCallback) {
            $http.post(adminurl + "register/logout").success(successCallback).error(errorCallback);
        },

    };
});
