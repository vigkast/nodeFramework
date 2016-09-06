var initMap = {};
var calculateAndDisplayRoute = {};
var google;
var allMovieName = [];
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'wu.masonry', 'ksSwiper', 'imageupload', 'ui.select', 'infinite-scroll'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $filter, $uibModal) {
    //Used to name the .html file

    $scope.openModal = function() {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'frontend/views/modal/subscribe.html',
            controller: 'HomeCtrl',
            size: 'lg',
            windowClass: 'subscribe-modal',
        });
    };

    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    TemplateService.removeLoaderOn(5);

    $scope.mySlides = [
        'frontend/img/banners/slide1.jpg',
        'frontend/img/banners/slide1.jpg'
    ];
    $scope.mySlide = [
        'frontend/img/banners/mob-slider.jpg',
        'frontend/img/banners/mob-slider.jpg'
    ];
    NavigationService.getAllUpcomingMovies(function(data) {
        $scope.AllUpcomingMovies = _.orderBy(data.data, function(n) {
            var date2 = moment("01-" + n.month + "-" + n.year,"D-M-YYYY");
            return (date2.unix());
        });

        TemplateService.removeLoader();
    });
    NavigationService.getAllRecentMovies(function(data) {
        $scope.AllRecentMovies = data.data;

        TemplateService.removeLoader();
    });
    NavigationService.getAllSlides(function(data) {
        $scope.getAllSlides = data.data;

        TemplateService.removeLoader();
    });
    NavigationService.getDharmaTvSlides(function(data) {
        $scope.getDharmaTvSlides = data.data[0];

        TemplateService.removeLoader();
    });
    NavigationService.getAllUpcomingMoviesHome(function(data) {
        $scope.getAllUpcomingMovies = data.data;
        $scope.getAllUpcomingMovies = $filter('limitTo')($scope.getAllUpcomingMovies, 20);

        TemplateService.removeLoader();
    });



    $scope.movie = [{
        img: "frontend/img/movie/m1.jpg",
        name: "Ae Dil hai mushkil"
    }, {
        img: "frontend/img/movie/m2.jpg",
        name: "BAAR BAAR DEKHO"
    }, {
        img: "frontend/img/movie/m3.jpg",
        name: "BADRINATH KI DULHANIYA"
    }, {
        img: "frontend/img/movie/m4.jpg",
        name: "RAM LAKHAN"
    }, {
        img: "frontend/img/movie/m5.jpg",
        name: "ok jaanu"
    }];
    $scope.video = [{
        img: "frontend/img/video/v1.jpg",
        name: "Director S.S. Rajamouli tells us why Katappa killed Bahubali"

    }, {
        img: "frontend/img/video/v2.jpg",
        name: "Kapoor & Sons | The Funny One: Fawad Khan"

    }, {
        img: "frontend/img/video/v3.jpg",
        name: "Arjun fights with his Bai? | Movie Review | Kapoor & Sons | Sidharth..."

    }, {
        img: "frontend/img/video/v4.jpg",
        name: "Kapoor & Sons | Rahul Meets Tia | Dialogue Promo | Fawad Khan..."

    }, {
        img: "frontend/img/video/v1.jpg",
        name: "Director S.S. Rajamouli tells us why Katappa killed Bahubali"

    }, {
        img: "frontend/img/video/v2.jpg",
        name: "Kapoor & Sons | The Funny One: Fawad Khan"

    }, {
        img: "frontend/img/video/v3.jpg",
        name: "Arjun fights with his Bai? | Movie Review | Kapoor & Sons | Sidharth..."

    }, {
        img: "frontend/img/video/v4.jpg",
        name: "Kapoor & Sons | Rahul Meets Tia | Dialogue Promo | Fawad Khan..."

    }];
    $scope.news = [{
        img: "frontend/img/news/n1.jpg",
        name: "Kapoor & Sons out now!",
        date: "28 Mar 2016",
        desc: "The story that will tug at your heartstrings, tickle your funny bone and leave you wanting to love your family evermore."

    }, {
        img: "frontend/img/news/n2.jpg",
        name: "Bahubali bags The Best Film Of 2015 National Award",
        date: "28 Mar 2016",
        desc: "Baahubali wins National Award for the best film in 2015! Congratulations to the team. We are proud partners! "

    }, {
        img: "frontend/img/news/n3.jpg",
        name: "Baahubali added to the Top 10 World TV premiere list!",
        date: "16 Nov 2015",
        desc: "Baahubali storms television ratings as TAM reports add it to the Top 10 World TV premiere list! Huge congratulations to the team."

    }, {
        img: "frontend/img/news/n4.jpg",
        name: "Shaandaar Out In Cinemas",
        date: "21 Oct 2015",
        desc: "Shaandaar starring Shahid Kapoor and Alia Bhatt hits the screens today. The movie is directed by Vikas Bahl and co produced by Fox Star Studios and Phantom films. "

    }, {
        img: "frontend/img/news/n5.jpg",
        name: "Shaandaar's title track out now!",
        date: "16 Sep 2015",
        desc: "Shaandaar's title track 'Shaam Shaandaar' sung by Amit Trivedi was released today. The song is a grand celebration featuring Shahid Kapoor and Alia Bhatt."

    }, {
        img: "frontend/img/news/n6.jpg",
        name: "35 Years Of Dharma",
        date: "08 Oct 2015",
        desc: "Heart-warming storylines, Stellar megastar casts, Record box-office collections...A legacy that paved way into the hearts of the audience completes celebrates 35 glorious years today."

    }];
    NavigationService.getNews(function(data) {
        $scope.News = data.data;

        $scope.limitedNews = $filter('limitTo')($scope.News, 10);

        _.each($scope.limitedNews, function(value) {
            value.date = new Date(value.date);
        });

    });

    $scope.subscribe = {};
    $scope.subscribe.email = "";
    $scope.checkEmail = false;
    $scope.subscribeEmail = false;
    $scope.subscribe = function(email, form) {
        if (email && email !== '' && form.$valid) {
            NavigationService.subScribe(email, function(data) {
                if (data.data.message == 'already exist') {
                    // if ($scope.subscribe.email) {
                    $scope.checkEmail = true;
                    // $scope.subscribeEmail = false;
                    $timeout(function() {
                        $scope.checkEmail = false;
                    }, 2000);

                    // }
                } else {
                    $scope.openModal();
                    $scope.checkEmail = false;
                    // $scope.subscribeEmail = true;
                    // $timeout(function() {
                    //     $scope.subscribeEmail = false;
                    // }, 2000);


                }
                $scope.subscribe.email = "";
            });
        }
    };


    $scope.tabs = 'upcoming';
    $scope.classp = 'active-tab';
    $scope.classv = '';


    $scope.tabchanges = function(tabs, a) {

        $scope.tabs = tabs;
        if (a == 1) {

            $scope.classp = "active-tab";
            $scope.classv = '';

        } else {

            $scope.classp = '';
            $scope.classv = "active-tab";
        }
    };

})

.controller('headerctrl', function($scope, TemplateService, NavigationService, $state) {
    $scope.template = TemplateService;
    if($.jStorage.get("allMovieName"))
    {
      $scope.allMovieName = $.jStorage.get("allMovieName");
    }
    else {
      NavigationService.getAllMovieName(function(data) {
          $.jStorage.setTTL("allMovieName",data.data,3600000);
          $scope.allMovieName = data.data;

      });
    }


    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $scope.showSub = function(menu) {

        menu.show = !menu.show;
        // $scope.navigation = NavigationService.getnav();
    };
    $scope.headerSearch = false;
    $scope.crossdisplay = true;
    $scope.getHeaderSearch = function() {
        $scope.headerSearch = true;
    };
    $scope.closeCross = function() {
        $scope.headerSearch = false;
    };
    $scope.DoSearch = function(search, id) {
        $state.go('movie-inside', {
            id: id
        });
    };


})

.controller('OverviewCtrl', function($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService.changecontent("overview");
        $scope.menutitle = NavigationService.makeactive("Overview");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })
    .controller('PrivacyPolicyCtrl', function($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService.changecontent("privacy-policy");
        $scope.menutitle = NavigationService.makeactive("Privacy Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })

.controller('AwardsCtrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("awards");
    $scope.menutitle = NavigationService.makeactive("Awards");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

})

.controller('DharmaJourneyCtrl', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("dharma-journey");
    $scope.menutitle = NavigationService.makeactive("Dharma Journey");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    NavigationService.getJourney(function(data) {
        $scope.journeys = data;
    });

})

.controller('MapCtrl', function($scope, TemplateService, NavigationService, $timeout) {

        var directionsService = {};
        var directionsDisplay = {};

        initMap = function() {

            var mapTheme = [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#f2f2f2"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 45
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "color": "#f5b690"
                }, {
                    "visibility": "on"
                }]
            }];


            var customMapType = new google.maps.StyledMapType(mapTheme, {
                name: 'Dharma Style'
            });
            var customMapTypeId = 'custom_style';

            var location = {
                lat: 19.133687,
                lng: 72.836493
            };

            directionsService = new google.maps.DirectionsService;
            directionsDisplay = new google.maps.DirectionsRenderer;
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 17,
                center: location,
                scrollwheel: false,
            });

            directionsDisplay.setMap(map);

            addMarker(location, map);
        };

        var icon = {
            url: "frontend/img/dharmamapmarker.png",
            fillOpacity: 1,
            scaledSize: {
                width: 75,
                height: 60
            },
        };

        function addMarker(location, map) {
            // Add the marker at the clicked location, and add the next-available label
            // from the array of alphabetical characters.
            var marker = new google.maps.Marker({
                position: location,
                icon: icon,
                map: map
            });
        }

        /// MAX til here

        if (google && google.maps) {
            initMap();
        } else {
            $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAc75yahObocBDF_deZ7T6_rUkS8LS4t00&callback=initMap", function(data, textStatus, jqxhr) {

            });
        }





    })
    .controller('TvInsideCtrl', function($scope, TemplateService, NavigationService, $stateParams, $state) {
        $scope.template = TemplateService.changecontent("tv-inside");
        $scope.menutitle = NavigationService.makeactive("TV Inside");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);

        $scope.getDharmaTV = function() {
            NavigationService.getAllDharmatv10(function(data) {
                var data2 = _.filter(data.data, function(video) {
                    if (video.movie && video.movie._id) {
                        return video.movie._id == $stateParams.id;
                    }
                });

                $scope.allvideos = data2;
                TemplateService.removeLoader();
            });
        };
        if ($stateParams.id) {
            $scope.getDharmaTV();

        }
        // $scope.allMovieName=[];

        $scope.seeMore = false;
        $scope.seeLess = false;
        var movieNameArray = [];
        $scope.seeLessMovieName = function() {
            NavigationService.getAllMovieName(function(data) {
                $scope.allMovieName = data.data;
                movieNameArray = _.cloneDeep($scope.allMovieName);
                // $scope.allMovieName = _.chunk($scope.allMovieName,10);
                $scope.allMovieName = _.slice($scope.allMovieName, [0], [10]);
                $scope.seeMore = true;
                if ($stateParams.id) {
                    $scope.currentMovie = _.find($scope.allMovieName, function(key) {
                        // $scope.goMovie=false;
                        return key._id == $stateParams.id;
                    }).name;
                }

                TemplateService.removeLoader();

            });
        };
        $scope.seeLessMovieName();
        $scope.seeMoreMovieName = function() {
            $scope.seeMore = false;
            $scope.seeLess = true;
            // $scope.allMovieName = {}
            $scope.allMovieName = movieNameArray;
        };

        NavigationService.getAllTags(function(data) {
            $scope.getAllTags = data.data;
            TemplateService.removeLoader();
        });

        $scope.goToMovie = function(id, name) {
            // $scope.goMovie = true;
            // $scope.currentMovie = name;
            $state.go('tv-inside', {
                id: id
            });

        };
        $scope.searchdata = {};
        $scope.searchdata.search = "";
        $scope.nodata = false;
        $scope.getsearch = false;
        // $scope.searchdata.search = [];
        if ($stateParams.search) {
            $scope.searchdata.search = $stateParams.search;
        }
        $scope.viewSearch = function() {
            $scope.searchdata.search = "";
            // $scope.getsearch = false;
        };


        $scope.allvideos = [];
        $scope.currentMovie = '';

        // $scope.goToMovie($stateParams.id,$scope.currentMovie);

    })
    .controller('MovieInsideCtrl', function($scope, TemplateService, NavigationService, $uibModal, $stateParams, $filter, $window, $timeout, $state) {
        $scope.template = TemplateService.changecontent("movie-inside");
        $scope.menutitle = NavigationService.makeactive("Movie Inside");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);

        $scope.animationsEnabled = true;
        $scope.viewCastText = "VIEW";

        $scope.getAllvideo = false;
        $scope.isSubCast = false;
        $scope.myUrl = '';
        NavigationService.newGetOneMovie($stateParams.id, function(data) {

            $scope.myUrl = window.location.href;

            $scope.myid = $stateParams.id;
            $scope.moviefindOne = data.data.movie;
            $scope.moviefindOne.backgroundImage = $filter('uploadpath')($scope.moviefindOne.backgroundImage);
            $scope.moviefindOne.cutImage2 = $filter('uploadpath')($scope.moviefindOne.cutImage2);
            $scope.moviefindOne.cutImage = $filter('uploadpath')($scope.moviefindOne.cutImage);


            TemplateService.removeLoader();
            $scope.getOneMovie = data.data;
            // TemplateService.removeLoader();
            $scope.movieCast = data.data.movie.cast;
            _.each($scope.movieCast, function(n) {
                if (n.type == 'Sub-cast') {
                    $scope.isSubCast = true;
                }
                // TemplateService.removeLoader();
                $scope.movieCrew = data.data.crew;
            });
            // TemplateService.removeLoader();
            $scope.MovieGal = data.data.gallery;
            // TemplateService.removeLoader();
            $scope.movieBehindTheScenes = data.data.behindTheScenes;
            // TemplateService.removeLoader();
            $scope.movieVideo = data.data.videos;

            $scope.movieVideo10 = _.chunk($scope.movieVideo, 6);
            // TemplateService.removeLoader();
            $scope.movieWallpaper = data.data.wallpaper;
            // TemplateService.removeLoader();

            // TemplateService.removeLoader();
            if (_.isArray(data.data.award)) {
                $scope.MovieAwards = data.data.award;
            }
            // TemplateService.removeLoader();


            $scope.movieNews = data.data.news;
            _.each($scope.movieNews, function(n) {
                n.date = new Date(n.date);

            });
            // TemplateService.removeLoader();
        });

        $scope.subCast = false;
        $scope.viewAllCast = function() {
            $scope.subCast = !$scope.subCast;
            if ($scope.subCast) {
                $scope.viewCastText = "HIDE";
            } else {
                $scope.viewCastText = "VIEW";
            }
        };
        $scope.tabing = [{
                name: "Synopsis",
                class: "classa",
                tab: "synopsis",
                id: "1",
                ngclass: "movieSynopsisAndNote.synopsis ==''",
                ngdisabled: "movieSynopsisAndNote.synopsis ==''",
                index: 0
            }, {
                name: "CAST & CREDITS",
                class: "classb",
                tab: "cast",
                id: "2",
                ngclass: "movieCast.length<=0",
                ngdisabled: "movieCast.length<=0",
                index: 1
            }, {
                name: "News",
                class: "classc",
                tab: "news",
                id: "3",
                ngclass: "movieNews.length<=0",
                ngdisabled: "movieNews.length<=0",
                index: 2,
                nghide: "movieNews.length<=0"
            }, {
                name: "Gallery",
                class: "classd",
                tab: "gallery",
                id: "4",
                ngclass: "MovieGal.length<=0",
                ngdisabled: "MovieGal.length<=0",
                index: 3
            }, {
                name: "behind the scenes",
                class: "classe",
                tab: "scene",
                id: "5",
                ngclass: "movieBehindTheScenes.length<=0",
                ngdisabled: "movieBehindTheScenes.length<=0",
                index: 4
            }, {
                name: "VIDEOS",
                class: "classf",
                tab: "video",
                id: "6",
                ngclass: "movieVideo10.length<=0",
                ngdisabled: "movieVideo10.length<=0",
                index: 5
            }, {
                name: "WALLPAPERS",
                class: "classg",
                tab: "wallpapper",
                id: "7",
                ngclass: "movieWallpaper.length<=0",
                ngdisabled: "movieWallpaper.length<=0",
                index: 6
            }, {
                name: "AWARDS",
                class: "classh",
                tab: "awards",
                id: "8",
                ngclass: "MovieAwards.length  == 0",
                ngdisabled: "MovieAwards.length  == 0",
                index: 7,
                nghide: "MovieAwards.length  == 0"
            }]
            // }, 1000);

        $(window).scroll(function() {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top ').fadeIn();
            } else {
                $('.back-to-top ').fadeOut();
            }
        });


        $scope.open = function(size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'frontend/views/modal/modal.html',
                controller: 'MovieInsideCtrl',
                size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });

        };

        $scope.toggleAnimation = function() {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };


        $scope.accordian = [];
        $scope.accordian.push({
            isFirstOpen: true,
            isFirstDisabled: false
        });
        $scope.accordian.push({
            isFirstOpen: true,
            isFirstDisabled: false
        });
        $scope.accordian.push({
            isFirstOpen: true,
            isFirstDisabled: false
        });
        $scope.accordian.push({
            isFirstOpen: true,
            isFirstDisabled: false
        });
        $scope.accordian.push({
            isFirstOpen: true,
            isFirstDisabled: false
        });


        $scope.tabs = 'desktop';
        $scope.classp = 'active-list';
        $scope.classv = '';


        $scope.tabchanges = function(tabs, a) {

            $scope.tabs = tabs;
            if (a == 2) {

                $scope.classp = "active-list";
                $scope.classv = '';

            } else {

                $scope.classp = '';
                $scope.classv = "active-list";
            }
        };


        $scope.tab = 'synopsis';
        $scope.classa = 'active-list';
        $scope.classb = '';
        $scope.classc = '';
        $scope.classd = '';
        $scope.classe = '';
        $scope.classf = '';
        $scope.classg = '';
        $scope.classh = '';



        $scope.tabchange = function(tab, a, id) {


            $scope.tab = tab;
            if (a == 1) {


                $scope.classa = "active-list";
                $scope.classb = '';
                $scope.classc = '';
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 2) {

                $scope.classa = '';
                $scope.classb = "active-list";
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 3) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "active-list";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 4) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = 'active-list';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 5) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = 'active-list';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 6) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = 'active-list';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 7) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = 'active-list';
                $scope.classh = '';
            } else if (a == 8) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = 'active-list';
            }
        };
        $scope.tabchangeMob = function(selected, id) {

            $scope.tab = selected;
            $scope.tabid = id;
            _.each($scope.tabing, function(key) {
                key.activemob = false;
            });
            $scope.tabing[id].activemob = true;
        };
        $scope.tabchangeMob($scope.tabing[0].tab, 0);
        $scope.tabchangeByURl = function(text) {
            var id = _.find($scope.tabing, function(key) {
                return key.tab == text;
            }).id;
            var tabindex = _.find($scope.tabing, function(key) {
                return key.tab == text;
            }).index;
            $scope.tabchange(text, id);
            $scope.tabchangeMob(text, tabindex);

        }
        if ($stateParams.tab) {
            $scope.tabchangeByURl($stateParams.tab);

        }
        $scope.cast = [{
            img: "frontend/img/cast/c1.png",
            name: "Ranbir Kapoor",
            nick: "BUNNY"
        }, {
            img: "frontend/img/cast/c2.png",
            name: "Deepika Padukone",
            nick: "NAINA"
        }, {
            img: "frontend/img/cast/c3.png",
            name: "Kalki Koechlin",
            nick: "ADITI"
        }, {
            img: "frontend/img/cast/c4.png",
            name: "Aditya Roy Kapur",
            nick: "AVI"
        }]
        $scope.gallery = [
            "frontend/img/gallery/g18.jpg",
            "frontend/img/gallery/g19.jpg",
            "frontend/img/gallery/g20.jpg",
            "frontend/img/gallery/g21.jpg",
            "frontend/img/gallery/g22.jpg",
            "frontend/img/gallery/g23.jpg",
            "frontend/img/gallery/g24.jpg",
            "frontend/img/gallery/g25.jpg",
            "frontend/img/gallery/g20.jpg"
        ]
        $scope.desktop = [
            "frontend/img/wallpapper/d1.jpg",
            "frontend/img/wallpapper/d2.jpg",
            "frontend/img/wallpapper/d3.jpg",
            "frontend/img/wallpapper/d4.jpg",
            "frontend/img/wallpapper/d5.jpg",
            "frontend/img/wallpapper/d6.jpg"

        ]
        $scope.mobile = [
            "frontend/img/wallpapper/m1.jpg",
            "frontend/img/wallpapper/m2.jpg",
            "frontend/img/wallpapper/m3.jpg",
            "frontend/img/wallpapper/m4.jpg",
            "frontend/img/wallpapper/m1.jpg",
            "frontend/img/wallpapper/m2.jpg",
            "frontend/img/wallpapper/m3.jpg",
            "frontend/img/wallpapper/m4.jpg"

        ]
        $scope.allvideos = [{
            img: "frontend/img/video/v5.jpg",
            name: "KABIRA SONG"
        }, {
            img: "frontend/img/video/v6.jpg",
            name: "BALAM PICHKARI SONG"
        }, {
            img: "frontend/img/video/v7.jpg",
            name: "GHAGRA SONG"
        }, {
            img: "frontend/img/video/v8.jpg",
            name: "BADTAMEEZ DIL SONG"
        }, {
            img: "frontend/img/video/v9.jpg",
            name: "ILAHI SONG"
        }, {
            img: "frontend/img/video/v10.jpg",
            name: "DILLIWAALI GIRLFRIEND SONG"
        }]
        $scope.news = [{
            img: "frontend/img/dharma-world/d5.jpg",
            name: "Deepika scares me as an actor: Ranbir Kapoor",
            date: "21 Mar 2016",
            desc: "New Delhi: Films as varied as Raajneeti, Rockstar, Yeh Jawaani Hai Deewani and Barfi! have been a window to his versatility. But Ranbir Kapoor says his Tamasha ..."

        }, {
            img: "frontend/img/dharma-world/d6.jpg",
            name: "Varun Dhawan shares picture of Dharma Productions new office",
            date: "21 Mar 2016",
            desc: "After four years, Varun Dhawan is back at Dharma’s office. Though everything remains the same, the office is now a new place for all those who work there. "

        }, {
            img: "frontend/img/dharma-world/d7.jpg",
            name: "Bahubali bags The Best Film Of 2015 National Award",
            date: "21 Mar 2016",
            desc: "SS Rajamouli's Bahubali: The Beginning (also spelt as Baahubali), starring Prabhas and Rana Daggubati, has won the Best Feature Film at the 63rd National Film Award (NFA). "

        }, {
            img: "frontend/img/dharma-world/d8.jpg",
            name: "Dharma production hints at first ever love franchise",
            date: "21 Mar 2016",
            desc: "Best known for producing films that grab the beauty of exotic locales across the globe and intricately weaving romance, Dharma Productions has hinted at a sequel to Bollywood’s first ever love franchise."

        }, {
            img: "frontend/img/dharma-world/d9.jpg",
            name: "Ranbir Kapoor to promote ‘Yeh Jawaani Hai Deewani’ in Russia",
            date: "21 Mar 2016",
            desc: "Mumbai: His grandfather, late cinema legend Raj Kapoor, continues to be a rage in Russia and now actor Ranbir Kapoor is set to promote his latest release ‘Yeh Jawaani Hai..."

        }, {
            img: "frontend/img/dharma-world/d10.jpg",
            name: "Arjun and SIddharth’s Dharma Office Darshan",
            date: "21 Mar 2016",
            desc: "Bollywood heartthrobs Arjun Kapoor and Sidharth Malhotra are spilling fun all over the new office of Karan Johar's Dharma Productions. "

        }, {
            img: "frontend/img/dharma-world/d5.jpg",
            name: "Deepika scares me as an actor: Ranbir Kapoor",
            date: "21 Mar 2016",
            desc: "New Delhi: Films as varied as Raajneeti, Rockstar, Yeh Jawaani Hai Deewani and Barfi! have been a window to his versatility. But Ranbir Kapoor says his Tamasha ..."

        }, {
            img: "frontend/img/dharma-world/d6.jpg",
            name: "Varun Dhawan shares picture of Dharma Productions new office",
            date: "21 Mar 2016",
            desc: "After four years, Varun Dhawan is back at Dharma’s office. Though everything remains the same, the office is now a new place for all those who work there. "

        }, {
            img: "frontend/img/dharma-world/d7.jpg",
            name: "Bahubali bags The Best Film Of 2015 National Award",
            date: "21 Mar 2016",
            desc: "SS Rajamouli's Bahubali: The Beginning (also spelt as Baahubali), starring Prabhas and Rana Daggubati, has won the Best Feature Film at the 63rd National Film Award (NFA). "

        }]
        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));


            }, 0);
        });

    })
    .controller('ContactUsCtrl', function($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService.changecontent("contact-us");
        $scope.menutitle = NavigationService.makeactive("Contact Us");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })
    .controller('DharmaWorldCtrl', function($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService.changecontent("dharma-world");
        $scope.menutitle = NavigationService.makeactive("Dharma World");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        NavigationService.getAllTwitter(function(data) {
            $scope.getAllTwitterTag = data.data;
            $scope.getFirstId = data.data[0]._id;

        });
    })
    .controller('NewsEventsCtrl', function($scope, TemplateService, NavigationService, $state, $filter) {
        $scope.template = TemplateService.changecontent("news-events");
        $scope.menutitle = NavigationService.makeactive("News Events");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);
        $scope.news10 = [];
        $scope.filter = {};
        $scope.filter.pagenumber = 1;
        $scope.filter.pagesize = 10;
        $scope.filter.search = '';
        $scope.filter.year = 0;
        $scope.filter.month = 0;
        $scope.noviewmore = false;
        $scope.noNewsFound = false;
        $scope.crossdisplay = false;
        $scope.forViewMore = false;
        // $scope.noNewsFound = false;
        var lastpage = 1;
        $scope.pages = [1];
        $scope.movie = {};



        $scope.goYear = false;
        $scope.goMonth = false;
        var AllNews = [];
        var i = 0;

        function callMe() {
            // $scope.news10 = [];
            NavigationService.getNewsHomeSearch($scope.filter, ++i, function(data, newI) {
                if (newI == i) {
                    $scope.myTotal = data.data.total;
                    if ($scope.filter.search.length === 0) {
                        $scope.crossdisplay = false;
                    }
                    lastpage = data.data.totalpages;
                    if ($scope.filter.pagesize >= $scope.myTotal) {
                        $scope.forViewMore = true;
                    } else {
                        $scope.forViewMore = false;
                    }
                    $scope.myTotal = data.data.total;

                    if (data.value) {
                        if (data.data.data.length > 0) {
                            $scope.noNewsFound = false;
                            _.each(data.data.data, function(n) {
                                n.date = new Date(n.date);
                                $scope.news10.push(n);
                                AllNews = $scope.news10;

                            });
                        } else {
                            $scope.noNewsFound = true;
                        }

                    }
                    TemplateService.removeLoader();

                }

            });
        }
        // $scope.searchdata='';
        callMe();
        $scope.doSearch = function() {
            $scope.crossdisplay = true;
            $scope.news10 = [];
            callMe();

        };

        $scope.closeCross = function() {
            // $state.reload();
            $scope.news10 = [];
            $scope.crossdisplay = false;
            $scope.filter.search = '';
            // $scope.movie.selected = "";
            //
            callMe();
        };

        $scope.getNewsYear = function(year) {
            $scope.getYear = year;
            $scope.goYear = true;

            $scope.filter.year = year;
            // callMe();
        };
        $scope.getNewsMonth = function(month) {
            $scope.getMonth = month;
            $scope.goMonth = true;

            $scope.filter.month = month;
        };



        $scope.loadMore = function() {
            if (lastpage > $scope.filter.pagenumber) {

                ++$scope.filter.pagenumber;
                $scope.pages.push($scope.filter.pagenumber);

                callMe();
            }
        };




        NavigationService.getAllMovieName(function(data) {
            $scope.allMovieName = data.data;

        });

        NavigationService.getMonthYear(function(data) {
            $scope.monthYear = data.data;
            $scope.month = data.data.month;


            $scope.month = $scope.month.sort();
            $scope.month = $scope.month.sort(function(a, b) {
                return b - a;
            });
            $scope.month = $scope.month.reverse();
        });



        // $scope.getNews($scope.filter);
        $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
            {
                name: 'Kabhi Khushi Kabhi Gum',
                code: 'kkk'
            }, {
                name: 'Bahubali',
                code: 'BH'
            }, {
                name: 'Varun Dhawan',
                code: 'AA'
            }, {
                name: 'Deepika',
                code: 'D'
            }, {
                name: 'Ranbir Kapoor',
                code: 'RK'
            }
        ];

        $scope.news = [{
            img: "frontend/img/news/n1.jpg",
            name: "Kapoor & Sons out now!",
            date: "28 Mar 2016",
            desc: "The story that will tug at your heartstrings, tickle your funny bone and leave you wanting to love your family evermore."

        }, {
            img: "frontend/img/news/n2.jpg",
            name: "Bahubali bags The Best Film Of 2015 National Award",
            date: "28 Mar 2016",
            desc: "Baahubali wins National Award for the best film in 2015! Congratulations to the team. We are proud partners! "

        }, {
            img: "frontend/img/news/n3.jpg",
            name: "Baahubali added to the Top 10 World TV premiere list!",
            date: "16 Nov 2015",
            desc: "Baahubali storms television ratings as TAM reports add it to the Top 10 World TV premiere list! Huge congratulations to the team."

        }, {
            img: "frontend/img/news/n4.jpg",
            name: "Shaandaar Out In Cinemas",
            date: "21 Oct 2015",
            desc: "Shaandaar starring Shahid Kapoor and Alia Bhatt hits the screens today. The movie is directed by Vikas Bahl and co produced by Fox Star Studios and Phantom films. "

        }, {
            img: "frontend/img/news/n5.jpg",
            name: "Shaandaar's title track out now!",
            date: "16 Sep 2015",
            desc: "Shaandaar's title track 'Shaam Shaandaar' sung by Amit Trivedi was released today. The song is a grand celebration featuring Shahid Kapoor and Alia Bhatt."

        }, {
            img: "frontend/img/news/n6.jpg",
            name: "35 Years Of Dharma",
            date: "08 Oct 2015",
            desc: "Heart-warming storylines, Stellar megastar casts, Record box-office collections...A legacy that paved way into the hearts of the audience completes celebrates 35 glorious years today."

        }];
    })
    .controller('NewsDetailCtrl', function($scope, TemplateService, NavigationService, $stateParams, $filter) {
        $scope.template = TemplateService.changecontent("news-detail");
        $scope.menutitle = NavigationService.makeactive("News Detail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);


        $scope.getSearchNews = false;

        function newsDetail() {
            NavigationService.getOneNews($stateParams.id, function(data) {
                $scope.getOneNews = data.data.data;

                $scope.getOneRelated = data.data.related;
                TemplateService.removeLoader();
            });
        }


        newsDetail();

        $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
            {
                name: 'Kabhi Khushi Kabhi Gum',
                code: 'kkk'
            }, {
                name: 'Bahubali',
                code: 'BH'
            }, {
                name: 'Varun Dhawan',
                code: 'AA'
            }, {
                name: 'Deepika',
                code: 'D'
            }, {
                name: 'Ranbir Kapoor',
                code: 'RK'
            }
        ];







        $scope.news10 = [];
        $scope.filter = {};
        $scope.filter.pagenumber = 1;
        $scope.filter.pagesize = 10;
        $scope.filter.search = '';
        $scope.filter.year = 0;
        $scope.filter.month = 0;
        $scope.forViewMore = false;
        var AllNews = [];
        $scope.goYear = false;
        $scope.goMonth = false;
        $scope.noNewsFound = false;
        $scope.crossdisplay = false;
        var lastpage = 1;
        $scope.pages = [1];



        var i = 0;

        function callMe() {
            // $scope.news10 = [];
            NavigationService.getNewsHomeSearch($scope.filter, ++i, function(data, newI) {
                if (newI == i) {
                    $scope.myTotal = data.data.total;
                    if ($scope.filter.search.length === 0) {
                        $scope.crossdisplay = false;
                    }
                    lastpage = data.data.totalpages;
                    if ($scope.filter.pagesize >= $scope.myTotal) {
                        $scope.forViewMore = true;
                    } else {
                        $scope.forViewMore = false;
                    }
                    $scope.myTotal = data.data.total;
                    if (data.value) {
                        if (data.data.data.length > 0) {
                            $scope.noNewsFound = false;
                            _.each(data.data.data, function(n) {
                                n.date = new Date(n.date);
                                $scope.news10.push(n);
                                // AllNews = $scope.news10;

                            });
                        } else {
                            $scope.noNewsFound = true;
                        }

                    }
                    TemplateService.removeLoader();

                }

            });
        }
        // callMe();
        // $scope.doSearch = function() {
        //     $scope.crossdisplay = true;
        //     $scope.news10 = [];
        //     callMe();
        //
        // };
        $scope.movie = {};
        // $scope.crossdisplay = false;
        $scope.closeCross = function() {
            // $state.reload();
            $scope.getSearchNews = false;
            $scope.noNewsFound = false;
            $scope.crossdisplay = false;
            $scope.filter.search = '';
            $scope.movie.selected = "";
            if ($scope.filter.month || $scope.filter.year) {
                $scope.goSearch($scope.filter.month, $scope.filter.year);
            } else {
                newsDetail();
            }

        };

        // $scope.closeCross = function() {
        //     $scope.news10 = [];
        //     $scope.crossdisplay = false;
        //     $scope.filter.search = '';
        //
        //     callMe();
        // }
        $scope.getNews10 = function(name) {
            // $scope.crossdisplay = true;
            $scope.filter.search = name;

            callMe();
        };
        $scope.getNewsYear = function(year) {
            $scope.getYear = year;
            $scope.goYear = true;

            $scope.filter.year = year;
            // callMe();
        };
        $scope.getNewsMonth = function(month) {
            $scope.getMonth = month;
            $scope.goMonth = true;

            $scope.filter.month = month;
            // callMe();
        };

        $scope.goSearch = function(month, year) {
            $scope.getSearchNews = true;

            $scope.filter.month = month;
            $scope.filter.year = year;
            callMe();
        };
        $scope.loadMore = function() {
            if (lastpage > $scope.filter.pagenumber) {

                ++$scope.filter.pagenumber;
                $scope.pages.push($scope.filter.pagenumber);

                callMe();
            }
        };


        NavigationService.getMonthYear(function(data) {
                $scope.monthYear = data.data;
                $scope.month = data.data.month;
                $scope.month = $scope.month.sort();
                $scope.month = $scope.month.sort(function(a, b) {
                    return b - a;
                });
                $scope.month = $scope.month.reverse();
            });


        $scope.doSearch = function() {

            if ($scope.filter.search.length === 0 && !$scope.filter.month && !$scope.filter.year) {

                $scope.crossdisplay = false;
                $scope.getSearchNews = false;
                $scope.noNewsFound = false;
                newsDetail();
            } else {
                $scope.getSearchNews = true;
                $scope.crossdisplay = true;
                $scope.news10 = [];
                callMe();
            }

        };
        $scope.ViewMore = function(myTotal) {

            if ($scope.filter.pagesize < myTotal) {
                $scope.forViewMore = true;
                $scope.filter.pagesize = myTotal;
                callMe();

            } else {
                $scope.forViewMore = false;
            }


        };

    })
    .controller('DharmaTvCtrl', function($scope, TemplateService, NavigationService, $stateParams, $filter, $state) {
        $scope.template = TemplateService.changecontent("dharma-tv");
        $scope.menutitle = NavigationService.makeactive("Dharma Tv");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);
        $scope.mySlides = [
            'frontend/img/video-play.jpg',
            'frontend/img/video-play.jpg'
        ];
        $scope.mysearch = {};
        $scope.viewAll = function() {
            $scope.AllDharmatv = array;

        };

        NavigationService.getAllDharmaTvSlider(function(data) {
            $scope.getAllDharmaTvSlider = data.data;
            TemplateService.removeLoader();
        });
        $scope.viewSearch = function() {
            // $scope.searchdata.search = "";
            // $scope.callAll();
            if ($stateParams.search) {
                $state.go('dharma-tv');
            } else {
                $scope.searchdata.search = "";
                $scope.callAll();
            }
            // $scope.getsearch = false;
        };
        $scope.searchdata = {};
        $scope.nodata = false;
        $scope.getsearch = false;
        var array = [];
        var Allvideos = [];
        $scope.callAll = function() {
            NavigationService.getAllDharmatv10(function(data) {
                Allvideos = data.data;
                if ($stateParams.search || $stateParams.search === "") {
                    $scope.searchdata.search = $stateParams.search;
                    $scope.doSearch();
                } else {
                    groupIt(Allvideos);
                }

            });
        };
        $scope.callAll();
        // if($stateParams.search){
        //   $scope.searchdata.search=$stateParams.search;
        $scope.noMovieFound = false;
        $scope.doSearch = function() {
            var data1 = $filter('filter')(Allvideos, {
                title: $scope.searchdata.search
            });
            var data2 = $filter('filter')(Allvideos, {
                movie: {
                    name: $scope.searchdata.search
                }
            });
            var data3 = $filter('filter')(Allvideos, {
                tag: $scope.searchdata.search
            });
            var data = _.union(data1, data2, data3);
            data = _.orderBy(data, "movie.name");
            TemplateService.getLoader();
            groupIt(data);

        };
        // }


        function groupIt(alldata) {

            var videos = _.groupBy(alldata, "movie.name");
            delete videos.undefined;
            TemplateService.removeLoader();
            if (Object.keys(videos).length == 0) {
                $scope.noMovieFound = true;
            } else {
                $scope.noMovieFound = false;
            }
            $scope.AllDharmatv = videos;
        }

        $scope.video = [{
            img: "frontend/img/movie/m6.jpg",
            name: "Dhivara Full Video Song  Baahubali (Hindi) "

        }, {
            img: "frontend/img/movie/m7.jpg",
            name: "Making of Bahubali - Bull Fight Sequence"

        }, {
            img: "frontend/img/movie/m8.jpg",
            name: "Baahubali Trailer | Prabhas, Rana Daggubati, Anushka, Tama..."

        }, {
            img: "frontend/img/movie/m9.jpg",
            name: "Making Of Bahubali VFX Work On Bull Fight With Rana..."

        }, {
            img: "frontend/img/movie/m6.jpg",
            name: "Dhivara Full Video Song  Baahubali (Hindi) "

        }, {
            img: "frontend/img/movie/m7.jpg",
            name: "Making of Bahubali - Bull Fight Sequence"

        }, {
            img: "frontend/img/movie/m8.jpg",
            name: "Baahubali Trailer | Prabhas, Rana Daggubati, Anushka, Tama..."

        }, {
            img: "frontend/img/movie/m9.jpg",
            name: "Making Of Bahubali VFX Work On Bull Fight With Rana..."


        }, {
            img: "frontend/img/movie/m6.jpg",
            name: "Dhivara Full Video Song  Baahubali (Hindi) "

        }, {
            img: "frontend/img/movie/m8.jpg",
            name: "Baahubali Trailer | Prabhas, Rana Daggubati, Anushka, Tama..."
        }];

    })
    .controller('DharmaInstaCtrl', function($scope, TemplateService, NavigationService, $stateParams, $filter, $timeout) {
        $scope.template = TemplateService.changecontent("dharma-insta");
        $scope.menutitle = NavigationService.makeactive("Dharma Insta");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);

        $scope.postFilter = {};
        $scope.postFilter.pagenumber = 1;
        $scope.postFilter.pagesize = 18;

        NavigationService.getAllPosts($scope.postFilter, function(data) {
            $scope.myPosts = data.data.data;

            TemplateService.removeLoader();
        });

        NavigationService.getAllConfig(function(data) {
            $scope.getInstaConfig = data.data;

            TemplateService.removeLoader();
        });

        $scope.posts = [{
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }];
    })
    .controller('Dharma140Ctrl', function($scope, TemplateService, NavigationService, $stateParams, $filter, $timeout) {
        $scope.template = TemplateService.changecontent("dharma140");
        $scope.menutitle = NavigationService.makeactive("Dharma@140");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(2);

        NavigationService.getAllTwitter(function(data) {
            $scope.getAllTwitterTag = data.data;

            $scope.selectOneHashTag($stateParams.id);
            TemplateService.removeLoader();

        });
        $scope.isMatch = false;
        // $scope.getClass = "";
        $scope.selectOneHashTag = function(id) {

            _.each($scope.getAllTwitterTag, function(key) {
                if (key._id == id) {
                    key.isMatch = true;

                } else {
                    key.isMatch = false;

                }
            });

            NavigationService.getOneHashTag(id, function(data) {
                $scope.getOneHashTag = data.data.statuses;
                _.each($scope.getOneHashTag, function(key) {

                    key.created_at = new Date(key.created_at);

                });

                TemplateService.removeLoader();
            });

        };

        $scope.hashtags = [{
            tag: "lifeatdharma"
        }, {
            tag: "baarbaardekho"
        }, {
            tag: "ramlakhan"
        }, {
            tag: "shaandar"
        }, {
            tag: "brothers"
        }];

        $scope.tweets = [{
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: ''
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: ''
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: 'https://pbs.twimg.com/media/CnUafNAWYAAgbrU.jpg:large'
        }, {
            username: "TarunMansukhani",
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            msg: 'Dharma. Upgraded to Version 3.0 To new beginnings!!!',
            img: ''
        }];
    })
    .controller('DharmaYouCtrl', function($scope, TemplateService, NavigationService, $uibModal) {
        $scope.template = TemplateService.changecontent("dharma-you");
        $scope.menutitle = NavigationService.makeactive("Dharma & You");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);

        NavigationService.dharmaYouAll(function(data) {
            $scope.dharmaPosts = data.data;

            $scope.enableData = _.groupBy($scope.dharmaPosts, "status");

            $scope.dharmaPosts = [];
            $scope.dharmaPosts = $scope.enableData.true;

            $scope.dharmaPosts = _.chunk($scope.dharmaPosts, 2);

            TemplateService.removeLoader();
        });

        $scope.posts = [{
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            quest: 'Why was Kal Ho Na Ho shot in New York and not London?',
            answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
        }, {
            name: 'TARUN MANSUKHANI',
            userImg: 'https://pbs.twimg.com/profile_images/581418336765878272/cWzXUfYW_400x400.jpg',
            day: 'May 9',
            time: '6:06AM',
            quest: 'Why was Kal Ho Na Ho shot in New York and not London?',
            answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
        }];
        $scope.openModal = function() {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'frontend/views/modal/dharma-you.html',
                controller: 'DharmaYouCtrl',
                size: 'lg',
                windowClass: 'dharma-you-modal',
            });
        };

        $scope.submitForm = function(data) {

        };
        $scope.questionSubmit = false;
        $scope.formData = {};
        $scope.saveYou = function(formData) {
            NavigationService.youSave($scope.formData, function(data) {
                if (data.value === true) {
                    $scope.questionSubmit = true;
                }
            });
        };
    })
    .controller('MoviesCtrl', function($scope, TemplateService, NavigationService, $stateParams, $filter, $timeout, $state) {
        $scope.template = TemplateService.changecontent("movies");
        $scope.menutitle = NavigationService.makeactive("Movies");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.removeLoaderOn(1);



        $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
            {
                name: 'Kabhi Khushi Kabhi Gum',
                code: 'kkk'
            }, {
                name: 'Bahubali',
                code: 'BH'
            }, {
                name: 'Varun Dhawan',
                code: 'AA'
            }, {
                name: 'Deepika',
                code: 'D'
            }, {
                name: 'Ranbir Kapoor',
                code: 'RK'
            }
        ];

        $scope.video = [{
            img: "frontend/img/movie/m11.jpg",
            name: "Ae Dil hai mushkil"

        }, {
            img: "frontend/img/movie/m11.jpg",
            name: "BAAR BAAR DEKHO"

        }, {
            img: "frontend/img/movie/m11.jpg",
            name: "BADRINATH KI DULHANIYA"

        }, {
            img: "frontend/img/movie/m11.jpg",
            name: "RAM LAKHAN"

        }, {
            img: "frontend/img/movie/m11.jpg",
            name: "ok jaanu"

        }, {
            img: "frontend/img/movie/m11.jpg",
            name: "Ae Dil hai mushkil"

        }, {
            img: "frontend/img/movie/m11.jpg",
            name: "BAAR BAAR DEKHO"

        }, {
            img: "frontend/img/movie/m11.jpg",
            name: "BADRINATH KI DULHANIYA"

        }];
        $scope.video = _.chunk($scope.video, 4);
        for (var i = 0; i < $scope.video.length; i++) {
            $scope.video[i] = _.chunk($scope.video[i], 4);
        }
        var array = [];
        var allMovies = [];
        NavigationService.getMovieDetails(function(data) {
            populateData(data.data);
            allMovies = data.data;
            TemplateService.removeLoader();

        });

        function populateData(data) {
            $scope.MovieDetails = data;
            $scope.movieList = _.groupBy($scope.MovieDetails, "releaseType");
            $scope.movieList.PastViewAll = $scope.movieList.Past;
            $scope.movieList.Recent = _.chunk($scope.movieList.Recent, 4);


            for (var i = 0; i < $scope.movieList.Recent.length; i++) {
                $scope.movieList.Recent[i] = _.chunk($scope.movieList.Recent[i], 4);
            }
            if ($scope.movieList.Past) {
                // $scope.movieList.PastViewAll = $scope.movieList.Past;
                $scope.movieList.PastMore = _.takeRight($scope.movieList.Past, $scope.movieList.Past.length - 10);
                $scope.movieList.PastMore = _.chunk($scope.movieList.PastMore, 5);
                $scope.movieList.Past = $scope.movieList.Past.splice(0, 10);
                $scope.movieList.Past = _.chunk($scope.movieList.Past, 5);
            }
            $scope.showRecent = false;
            $timeout(function() {
                $scope.showRecent = true;
            }, 100);
        }
        $scope.searchdata = {};
        $scope.searchdata.search = $stateParams.search;

        // var searchdatasend={
        //   search:$scope.searchdata.search
        // }
        $scope.viewAll = false;

        $scope.showViewAll = function() {
            $scope.viewAll = true;
        };
        $scope.nodata = false;
        $scope.getsearch = false;
        $scope.searchdata.search = [];
        // $scope.mySearchFor=false;
        $scope.DoSearch = function(search, id) {
            $state.go('movie-inside', {
                id: id
            });
            $scope.mySearchFor = search;

            $scope.viewAll = true;
            var data = $filter('filter')(allMovies, {
                name: search
            });

            populateData(data);
        };

        $scope.viewSearch = function(moviename) {

            $scope.moviename = '';
            $scope.mySearchFor = '';
            NavigationService.getMovieDetails(function(data) {
                populateData(data.data);
                allMovies = data.data;
                TemplateService.removeLoader();

            });

        };



        $scope.allvideos = [{
            img: "frontend/img/movie/m1.jpg",
            name: "Ae Dil hai mushkil"

        }, {
            img: "frontend/img/movie/m2.jpg",
            name: "BAAR BAAR DEKHO"

        }, {
            img: "frontend/img/movie/m3.jpg",
            name: "BADRINATH KI DULHANIYA"

        }, {
            img: "frontend/img/movie/m4.jpg",
            name: "RAM LAKHAN"

        }, {
            img: "frontend/img/movie/m5.jpg",
            name: "ok jaanu"

        }, {
            img: "frontend/img/movie/m1.jpg",
            name: "Ae Dil hai mushkil"

        }, {
            img: "frontend/img/movie/m2.jpg",
            name: "BAAR BAAR DEKHO"

        }, {
            img: "frontend/img/movie/m3.jpg",
            name: "BADRINATH KI DULHANIYA"

        }, {
            img: "frontend/img/movie/m4.jpg",
            name: "RAM LAKHAN"

        }, {
            img: "frontend/img/movie/m5.jpg",
            name: "ok jaanu"

        }];
        $scope.allvideos = _.chunk($scope.allvideos, 5);



        NavigationService.getAllMovieName(function(data) {
            $scope.allMovieName = data.data;
        });
    })

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function() {

        if (!$.jStorage.get("language")) {
            $translate.use("hi");
            $.jStorage.set("language", "hi");
        } else {
            if ($.jStorage.get("language") == "en") {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                $translate.use("en");
                $.jStorage.set("language", "en");
            }
        }
        //  $rootScope.$apply();
    };


})

;
