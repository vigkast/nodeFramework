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
            name: "Overview",
            classis: "active",
            noanchor: "overview",
            class: "fa fa-angle-down",
            subnav: [{
                name: "About Us",
                classis: "active",
                anchor: "overview",
                isId: "no",
            }, {
                name: "Dharma Journey",
                classis: "active",
                anchor: "dharma-journey",
                isId: "no",
            }]
        }, {
            name: "Movies",
            classis: "active",
            anchor: "movies",
            subnav: []
        },

        {
            name: "Dharma TV",
            classis: "active",
            anchor: "dharma-tv",
            subnav: []
        }, {
            name: "Dharma World",
            classis: "active",
            anchor: "dharma-world",
            class: "fa fa-angle-down",

            subnav: [{
                name: "Dharma @ 140",
                classis: "active",
                anchor: "dharma140",
                isId: "yes",
            }, {
                name: "Dharma & You",
                classis: "active",
                anchor: "dharma-you",
                isId: "no",
            }, {
                name: "Fancorner",
                classis: "active",
                anchor: "",
            }, {
                name: "Dharma Insta",
                classis: "active",
                anchor: "dharma-insta",
                isId: "no",
            }]
        }, {
            name: "News & Events",
            classis: "active",
            anchor: "news-events",
            subnav: []
        }, {
            name: "Contact Us",
            classis: "active",
            anchor: "contact-us",
            subnav: []
        }
    ];


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

        getMovieDetails: function(callback) {
            $http({
                url: adminurl + 'movie/getMovieDetails',
                method: 'POST',
                withCredentials: true
            }).success(function(data) {
                _.each(data.data, function(n) {
                    n._id = n.urlName;
                });
                callback(data);
            });
        },

        getJourney: function(callback) {
            $http({
                url: adminurl + 'journey/getall',
                method: 'POST',
                withCredentials: true
            }).success(function(data) {
                var a = _.orderBy(data.data, ["date"], ["desc"]);
                _.each(a, function(n) {
                    n.dateShow = moment(a.date).format("D MMM YYYY");
                });
                a = _.reverse(_.toArray(_.groupBy(a, "year")));
                callback(a);
            });
        },
        getNews: function(callback) {

            $http({
                url: adminurl + 'News/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        subScribe: function(email, callback) {
            $http({
                url: adminurl + 'subscribe/saveData',
                method: 'POST',
                withCredentials: true,
                data: {
                    "email": email
                }
            }).success(callback);
        },
        getDharmatvOne: function(id, callback) {
            $http({
                url: adminurl + 'Dharmatv/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    _id: id
                }

            }).success(callback);
        },
        getAllUpcomingMovies: function(callback) {

            $http({
                url: adminurl + 'Movie/getAllUpcomingMovies',
                method: 'POST',
                withCredentials: true
            }).success(function(data) {
                _.each(data.data, function(n) {
                    n._id = n.urlName;
                });
                callback(data);
            });
        },
        getAllUpcomingMoviesHome: function(callback) {

            $http({
                url: adminurl + 'dharmatv/getDharmaTvHomeSlider',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        getAllRecentMovies: function(callback) {

            $http({
                url: adminurl + 'Movie/getAllRecentMovies',
                method: 'POST',
                withCredentials: true
            }).success(function(data) {
                _.each(data.data, function(n) {
                    n._id = n.urlName;
                });
                callback(data);
            });
        },

        newGetOneMovie: function(id, callback) {
            $http({
                url: adminurl + 'Movie/getOneMovie',
                method: 'POST',
                withCredentials: true,
                data: {
                    _id: id
                }

            }).success(callback);
        },
        getMovieAwards: function(id, callback) {
            $http({
                url: adminurl + 'NewAward/getMovieAward',
                method: 'POST',
                withCredentials: true,
                data: {
                    _id: id
                }

            }).success(callback);
        },
        getNewsHomeSearch: function(request, i, callback) {
            console.log("myrequest", request);
            $http({
                url: adminurl + 'news/findLimited',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(function(data) {
                callback(data, i);
            });

        },
        getAllMovieName: function(callback) {

            $http({
                url: adminurl + 'Movie/getAllMovieName',
                method: 'POST',
                withCredentials: true
            }).success(function(data) {
                _.each(data.data, function(n) {
                    n._id = n.urlName;
                });
                callback(data);
            });
        },
        getAllSlides: function(callback) {

            $http({
                url: adminurl + 'homeslider/getAllHomeSlider',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        getDharmaTvSlides: function(callback) {

            $http({
                url: adminurl + 'dharmahome/getDharmaTvHome',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        getAllDharmaTvSlider: function(callback) {

            $http({
                url: adminurl + 'dharmaslider/getAllDharmaTvSlider',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },

        getAllDharmatv10: function(callback) {
            $http({
                url: adminurl + 'Dharmatv/getAll',
                method: 'POST',
                withCredentials: true
            }).success(function(data) {
                _.each(data.data, function(n) {
                    n.movie._id = _.kebabCase(n.movie.name) + "_" + n.movie.year;
                });
                callback(data);
            });
        },
        getAllTags: function(callback) {
            $http({
                url: adminurl + 'tag/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        getOneNews: function(id, callback) {
            $http({
                url: adminurl + 'News/getOneNews',
                method: 'POST',
                withCredentials: true,
                data: {
                    _id: id
                }

            }).success(callback);
        },
        getMonthYear: function(callback) {
            $http({
                url: adminurl + 'news/getMonthYear',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        getOneRelated: function(id, callback) {
            console.log(id);
            $http({
                url: adminurl + 'news/getOneArticle',
                method: 'POST',
                withCredentials: true,
                data: {
                    _id: id
                }
            }).success(callback);
        },
        getAllPosts: function(filterdata, callback) {
            $http({
                url: adminurl + 'dharmainsta/getAllInstaPosts',
                method: 'POST',
                withCredentials: true,
                data: filterdata
            }).success(callback);
        },
        getAllTwitter: function(callback) {
            $http({
                url: adminurl + 'dharma140/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        dharmaYouAll: function(callback) {
            $http({
                url: adminurl + 'dharmanyou/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        getOneHashTag: function(id, callback) {
            $http({
                url: adminurl + 'dharma140/getHash',
                method: 'POST',
                withCredentials: true,
                data: {
                    _id: id
                }
            }).success(callback);
        },
        youSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'dharmanyou/save',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getAllConfig: function(callback) {
            $http({
                url: adminurl + 'NewConfig/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },

    };
});
