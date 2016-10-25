var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
    var navigation = [{
        name: "Contact",
        classis: "active",
        sref: "#/page/viewContact//",
        icon: "phone"
    }, {
        name: "General",
        classis: "active",
        icon: "gear2",
        sref: "",
        subnav: [

            // {
            //     name: "View",
            //     classis: "active",
            //     icon: "user",
            //     link: "#/page/viewConfigTwo//",
            // },

            {
                name: "About",
                classis: "active",
                icon: "document",
                link: "#/page/staticPage//%7B%22_id%22:%22580cc65718015416d3a2ee46%22%7D",
            }, {
                name: "Privacy Policy",
                classis: "active",
                icon: "document",
                link: "#/page/staticPage//%7B%22_id%22:%22580cc67b7f2ec11727460f1c%22%7D",
            }, {
                name: "Terms and Conditions",
                classis: "active",
                icon: "document",
                link: "#/page/staticPage//%7B%22_id%22:%22580cc6877f2ec11727460f1f%22%7D",
            }, {
                name: "Product Tour",
                classis: "active",
                icon: "presentation",
                link: "#/page/staticVideo//%7B%22_id%22:%22580cc6c025bd19176f1fd147%22%7D",
            }, {
                name: "Coach Mentor Video",
                classis: "active",
                icon: "play",
                link: "#/page/staticVideo//%7B%22_id%22:%22580cc6cb25bd19176f1fd149%22%7D",
            }
        ]
    }, {
        name: "FAQ",
        classis: "active",
        sref: "#/page/viewFaq//",
        icon: "question"
    }, {
        name: "Coaches",
        classis: "active",
        sref: "#/page/viewCoach//",
        icon: "man"
    }, {
        name: "Athletes",
        classis: "active",
        sref: "#/page/viewAthlete//",
        icon: "man"
    }, {
        name: "Coaching Focus",
        classis: "active",
        sref: "#/page/viewCoachingFocus//",
        icon: "edit2"
    }, {
        name: "Specialisations",
        classis: "active",
        sref: "#/page/viewSpecialisations//",
        icon: "edit2"
    }, {
        name: "Athlete Coaching",
        classis: "active",
        sref: "#/page/viewAthleteCoaching//",
        icon: "timer"
    }, {
        name: "Competition",
        classis: "active",
        sref: "#/page/viewCompetition//",
        icon: "trophy"
    }, {
        name: "Athlete Competition",
        classis: "active",
        sref: "#/page/viewAthleteCompetition//",
        icon: "man"
    }, {
        name: "Test",
        classis: "active",
        sref: "#/page/viewTest//",
        icon: "speed-fast"
    }, {
        name: "Blog",
        classis: "active",
        sref: "#/page/viewBlog//",
        icon: "archive"
    }];
    var membershipLevel = [{
        name: "Student",
        id: "Student"
    }, {
        name: "Licentiate",
        id: "Licentiate"
    }, {
        name: "Associate",
        id: "Associate"
    }];

    return {
        getnav: function () {
            return navigation;
        },
        parseAccessToken: function (data, callback) {
            if (data) {
                $.jStorage.set("accessToken", data);
                callback();
            }
        },
        removeAccessToken: function (data, callback) {
            $.jStorage.flush();
        },
        profile: function (callback, errorCallback) {
            var data = {
                accessToken: $.jStorage.get("accessToken")
            };
            $http.post(adminurl + 'user/profile', data).success(function (data) {
                if (data.value === true) {
                    $.jStorage.set("profile", data.data);
                    callback();
                } else {
                    errorCallback(data.error);
                }
            });
        },
        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },

        search: function (url, formData, i, callback) {
            $http.post(adminurl + url, formData).success(function (data) {
                callback(data, i);
            });
        },
        delete: function (url, formData, callback) {
            $http.post(adminurl + url, formData).success(function (data) {
                callback(data);
            });
        },
        countrySave: function (formData, callback) {
            $http.post(adminurl + 'country/save', formData).success(callback);
        },

        apiCall: function (url, formData, callback) {
            $http.post(adminurl + url, formData).success(callback);
        },
        searchCall: function (url, formData, i, callback) {
            $http.post(adminurl + url, formData).success(function (data) {
                callback(data, i);
            });
        },

        getOneCountry: function (id, callback) {
            $http.post(adminurl + 'country/getOne', {
                _id: id
            }).success(callback);
        },
        getLatLng: function (address, i, callback) {
            $http({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyC62zlixVsjaq4zDaL4cefNCubjCgxkte4",
                method: 'GET',
                withCredentials: false,
            }).success(function (data) {
                callback(data, i);
            });
        }

    };
});