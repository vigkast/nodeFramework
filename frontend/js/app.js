// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'imageupload'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "frontend/views/template.html",
            controller: 'HomeCtrl'
        })
        .state('movies', {
            url: "/movies",
            templateUrl: "frontend/views/template.html",
            controller: 'MoviesCtrl'
        })
        .state('awards', {
            url: "/",
            templateUrl: "frontend/views/template.html",
            controller: 'AwardsCtrl'
        })
        .state('dharma-tv', {
            url: "/dharma-tv/",
            templateUrl: "frontend/views/template.html",
            controller: 'DharmaTvCtrl'
        })
        .state('dharma-tvsearch', {
            url: "/dharma-tv/:search",
            templateUrl: "frontend/views/template.html",
            controller: 'DharmaTvCtrl'
        })
        .state('tv-inside', {
            url: "/tv/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'TvInsideCtrl'
        })
        .state('tv-insideSearch', {
            url: "/tv/:id/:search",
            templateUrl: "frontend/views/template.html",
            controller: 'TvInsideCtrl'
        })
        // .state('tv-insideMovie', {
        //     url: "/tv-inside/:id/:search",
        //     templateUrl: "frontend/views/template.html",
        //     controller: 'TvInsideCtrl'
        // })
        .state('dharma-world', {
            url: "/dharma-world",
            templateUrl: "frontend/views/template.html",
            controller: 'DharmaWorldCtrl'
        })
        .state('news-events', {
            url: "/news-events",
            templateUrl: "frontend/views/template.html",
            controller: 'NewsEventsCtrl'
        })
        .state('dharma-journey', {
            url: "/dharma-journey",
            templateUrl: "frontend/views/template.html",
            controller: 'DharmaJourneyCtrl'
        })
        .state('contact-us', {
            url: "/contact-us",
            templateUrl: "frontend/views/template.html",
            controller: 'ContactUsCtrl'
        })
        .state('news-detail', {
            url: "/news-events/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'NewsDetailCtrl'
        })
        .state('privacy-policy', {
            url: "/privacy-policy",
            templateUrl: "frontend/views/template.html",
            controller: 'PrivacyPolicyCtrl'
        })
        .state('movie-inside', {
            url: "/movie/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'MovieInsideCtrl'
        })
        .state('movie-insideTab', {
            url: "/movie/:id/:tab",
            templateUrl: "frontend/views/template.html",
            controller: 'MovieInsideCtrl'
        })
        .state('overview', {
            url: "/overview",
            templateUrl: "frontend/views/template.html",
            controller: 'OverviewCtrl'
        })
        .state('dharma140', {
            url: "/dharma140/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'Dharma140Ctrl'
        })
        .state('dharma-insta', {
            url: "/dharma-insta",
            templateUrl: "frontend/views/template.html",
            controller: 'DharmaInstaCtrl'
        })
        .state('dharma-you', {
            url: "/dharma-you",
            templateUrl: "frontend/views/template.html",
            controller: 'DharmaYouCtrl'
        });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});
firstapp.filter('uploadpath', function() {
    return function(input, width, height, style) {
        var other = "";
        if (width && width !== "") {
            other += "&width=" + width;
        }
        if (height && height !== "") {
            other += "&height=" + height;
        }
        if (style && style !== "") {
            other += "&style=" + style;
        }
        if (input) {
            if (input.indexOf('https://') == -1) {
                return imgpath + "?file=" + input + other;

            } else {
                return input;
            }
        }
    };
});
firstapp.filter('wallpaperpath', function() {
    return function(input, width, height, style) {
        var other = "";
        if (width && width !== "") {
            other += "&width=" + width;
        }
        if (height && height !== "") {
            other += "&height=" + height;
        }
        if (style && style !== "") {
            other += "&style=" + style;
        }
        if (input) {
            if (input.indexOf('https://') == -1) {
                return imgurl + "wallpaper" + "?file=" + input + other;

            } else {
                return input;
            }
        }
    };
});
firstapp.filter('shorten', function() {
    return function(value, limit) {
        if (value)
            if (value.length < limit) {
                return value;
            } else {
                return value.slice(0, limit - 2) + "..";

            }

    };
});
firstapp.filter('getMonthAlpha', function() {
    return function(value) {
        var month = "";
        if (value) {
            switch (value) {
                case 1:
                    month = "Jan";
                    break;
                case 2:
                    month = "Feb";
                    break;
                case 3:
                    month = "Mar";
                    break;
                case 4:
                    month = "Apr";
                    break;
                case 5:
                    month = "May";
                    break;
                case 6:
                    month = "Jun";
                    break;
                case 7:
                    month = "Jul";
                    break;
                case 8:
                    month = "Aug";
                    break;
                case 09:
                    month = "Sept";
                    break;
                case 10:
                    month = "Oct";
                    break;
                case 11:
                    month = "Nov";
                    break;
                case 12:
                    month = "Dec";
                    break;
                case 'All':
                    month = "All";
                    break;
            }
            return month;
        } else {
            return month;

        }

    };
});
firstapp.filter('rawHtml', ['$sce',
    function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }
]);
firstapp.filter('cut', function() {
    return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;
        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});

firstapp.directive('uploadImage', function($http, $filter) {
    return {
        templateUrl: 'frontend/views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            callback: "=ngCallback"
        },
        link: function($scope, element, attrs) {
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple || attrs.multiple === "") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function(n) {
                        $scope.image.push({
                            url: $filter("uploadpath")(n)
                        });
                    });
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function() {
                $scope.model = [];
            };
            $scope.uploadNow = function(image) {
                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).success(function(data) {

                    if ($scope.callback) {
                        $scope.callback(data);
                    } else {
                        if ($scope.isMultiple) {
                            if ($scope.inObject) {
                                $scope.model.push({
                                    "image": data.data[0]
                                });
                            } else {
                                $scope.model.push(data.data[0]);
                            }
                        } else {
                            $scope.model = data.data[0];
                        }
                    }
                });
            };
        }
    };
});
firstapp.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});

firstapp.directive('img', function($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='frontend/img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function() {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});
firstapp.directive('fancybox', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            $element = $(element);

            setTimeout(function() {
                $(".various").fancybox({
                    maxWidth: 800,
                    maxHeight: 600,
                    fitToView: false,
                    width: '70%',
                    height: '70%',
                    autoSize: false,
                    closeClick: false,
                    openEffect: 'none',
                    closeEffect: 'none',
                    padding: 0

                });
            }, 100);

        }
    };
});
firstapp.directive('autoHeight', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            var windowHeight = $(window).height();
            var addHeight = function() {
                $element.css("min-height", windowHeight);
            };
            addHeight();
        }
    };
});
firstapp.directive('autoHeightfixed', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            var windowHeight = $(window).height() - 20;
            var addHeight = function() {
                $element.css("height", windowHeight);
            };
            addHeight();
        }
    };
});
firstapp.directive('fancyboxThumb', function() {
    return {
        restrict: 'C',
        replace: false,
        link: function($scope, element, attrs) {
            $('.fancybox-thumb').fancybox({
                prevEffect: 'none',
                nextEffect: 'none',
                helpers: {
                    title: {
                        type: 'outside'
                    },
                    thumbs: {
                        width: 70,
                        height: 70
                    }
                }
            });

        }
    };
});
firstapp.filter('thumbimage', function() {
    return function(input) {
        if (input) {
            return mainurl + 'image/index?name=' + input + '&width=400';
        } else {
            return "";
        }
    };
});
firstapp.directive('fancyboxBox', function($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function(scope, element, attr) {
            var $element = $(element);
            var target;
            if (attr.rel) {
                target = $("[rel='" + attr.rel + "']");
            } else {
                target = element;
            }

            target.fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                closeBtn: true,
                helpers: {
                    media: {}
                }
            });
        }
    };
});
firstapp.filter('youtubethumb', function() {
    return function(input, onlyid) {
        if (input) {
            return "http://img.youtube.com/vi/" + input + "/hqdefault.jpg";
        }
    };
});
firstapp.directive('scrolldown', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            // var windowHeight = $(window).height();
            $scope.scrollDown = function() {
                $('html,body').animate({
                        scrollTop: $(".second").offset().top
                    },
                    'slow');

            }

        }
    };
});
firstapp.directive('scrollToItem', function() {
    return {
        restrict: 'A',
        scope: {
            scrollTo: "@"
        },
        link: function(scope, $elm, attr) {

            $elm.on('click', function() {
                $('html,body').animate({
                    scrollTop: $(scope.scrollTo).offset().top
                }, "slow");
            });
        }
    }
});

firstapp.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
firstapp.filter('urlEncode', [function() {
    return window.encodeURIComponent;
}]);
firstapp.config(function($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});
