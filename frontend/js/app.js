// Link all the JS Docs here
var frontend = angular.module('frontend', [
    'ui.router',
    'mainController',
    'headerController',
    'languageController',
    'templateService',
    'apiService',
    'navigationService',
    'mainDirective',
    'mainFilter',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics'
]);

// Define all the routes below
frontend.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    var tempateURL = "views/template/template.html"; //Default Template URL

    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: tempateURL,
            controller: 'HomeCtrl'
        })
        .state('form', {
            url: "/form",
            templateUrl: tempateURL,
            controller: 'FormCtrl'
        });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});

// For Language JS
frontend.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});