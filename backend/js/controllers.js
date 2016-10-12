var globalfunction = {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', "jsonservicemod", 'ui.bootstrap', 'ui.select', 'ngAnimate', 'toastr', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'imageupload', 'ngMap', 'toggle-switch', 'cfp.hotkeys', 'ui.sortable'])

.controller('DashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("dashboard");
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})

.controller('AccessController', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    if ($.jStorage.get("accessToken")) {

    } else {
        $state.go("login");
    }
})

.controller('PageJsonCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams) {
    $scope.json = JsonService;
    $scope.template = TemplateService.changecontent("none");
    $scope.menutitle = NavigationService.makeactive("Country List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    JsonService.getJson($stateParams.id, function () {});
})

.controller('ViewCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams) {
    $scope.json = JsonService;
    $scope.template = TemplateService;
    var i = 0;
    if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
        $scope.currentPage = $stateParams.page;
    } else {
        $scope.currentPage = 1;
    }

    $scope.search = {
        keyword: ""
    };
    if ($stateParams.keyword) {
        $scope.search.keyword = $stateParams.keyword;
    }
    $scope.changePage = function (page) {
        var goTo = "page";
        if ($scope.search.keyword) {
            goTo = "page";
        }
        $state.go(goTo, {
            id: $stateParams.id,
            page: page,
            keyword: $scope.search.keyword
        });
    };

    $scope.getAllItems = function (keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {
            $scope.currentPage = 1;
        }
        NavigationService.search($scope.json.json.apiCall.url, {
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i,
            function (data, ini) {
                if (ini == i) {
                    $scope.items = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
    };
    $scope.getAllItems();

})



.controller('DetailCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams) {
    $scope.json = JsonService;
    JsonService.setKeyword($stateParams.keyword);
    $scope.template = TemplateService;
    $scope.data = {};
})


.controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
    //Used to name the .html file

    $scope.menutitle = NavigationService.makeactive("Login");
    TemplateService.title = $scope.menutitle;
    $scope.currentHost = window.location.origin;
    if ($stateParams.id) {
        NavigationService.parseAccessToken($stateParams.id, function () {
            NavigationService.profile(function () {
                $state.go("dashboard");
            }, function () {
                $state.go("login");
            });
        });
    } else {
        NavigationService.removeAccessToken();
    }

})


.controller('CountryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("country-list");
    $scope.menutitle = NavigationService.makeactive("Country List");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.currentPage = $stateParams.page;
    var i = 0;
    $scope.search = {
        keyword: ""
    };
    if ($stateParams.keyword) {
        $scope.search.keyword = $stateParams.keyword;
    }
    $scope.showAllCountries = function (keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {
            $scope.currentPage = 1;
        }
        NavigationService.searchCountry({
            page: $scope.currentPage,
            keyword: $scope.search.keyword
        }, ++i, function (data, ini) {
            if (ini == i) {
                $scope.countries = data.data.results;
                $scope.totalItems = data.data.total;
                $scope.maxRow = data.data.options.count;
            }
        });
    };

    $scope.changePage = function (page) {
        var goTo = "country-list";
        if ($scope.search.keyword) {
            goTo = "country-list";
        }
        $state.go(goTo, {
            page: page,
            keyword: $scope.search.keyword
        });
    };
    $scope.showAllCountries();
    $scope.deleteCountry = function (id) {
        globalfunction.confDel(function (value) {
            console.log(value);
            if (value) {
                NavigationService.deleteCountry(id, function (data) {
                    if (data.value) {
                        $scope.showAllCountries();
                        toastr.success("Country deleted successfully.", "Country deleted");
                    } else {
                        toastr.error("There was an error while deleting country", "Country deleting error");
                    }


                });
            }
        });
    };
})



.controller('CreateCountryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("country-detail");
        $scope.menutitle = NavigationService.makeactive("Country");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Country"
        };
        $scope.formData = {};
        $scope.saveCountry = function (formData) {
            console.log($scope.formData);
            NavigationService.countrySave($scope.formData, function (data) {
                if (data.value === true) {
                    $state.go('country-list');
                    toastr.success("Country " + formData.name + " created successfully.", "Country Created");
                } else {
                    toastr.error("Country creation failed.", "Country creation error");
                }
            });
        };

    })
    .controller('CreateAssignmentCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("assignment-detail");
        $scope.menutitle = NavigationService.makeactive("Assignment");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Assignment"
        };
        $scope.formData = {};
        $scope.formData.status = true;
        $scope.formData.invoice = [];
        $scope.formData.products = [];
        $scope.formData.LRs = [];
        $scope.formData.vehicleNumber = [];
        $scope.formData.others = [];
        $scope.formData.shareWith = [];
        $scope.modalData = {};
        $scope.modalIndex = "";
        $scope.wholeObj = [];
        $scope.addModels = function (dataArray, data) {
            dataArray.push(data);
        };

        // NavigationService.searchNatureLoss(function(data) {
        //     $scope.natureLoss = data.data.results;
        // });

        $scope.refreshShareWith = function (data, office) {
            var formdata = {};
            formdata.search = data;
            formdata.filter = {
                "postedAt": office
            };
            NavigationService.searchEmployee(formdata, 1, function (data) {
                $scope.shareWith = data.data.results;
            });
        };
        $scope.refreshNature = function (data, causeloss) {
            var formdata = {};
            formdata.search = data;
            formdata.filter = {
                "_id": causeloss
            };
            NavigationService.getNatureLoss(formdata, 1, function (data) {
                $scope.natureLoss = data.data.results;
            });
        };

        $scope.addModal = function (filename, index, holdobj, data, current, wholeObj) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
            } else {
                $scope.modalData = {};
                $scope.modalIndex = "";
            }
            $scope.wholeObj = wholeObj;
            $scope.current = current;
            $scope.holdObject = holdobj;
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        $scope.addElements = function (moddata) {
            if ($scope.modalIndex !== "") {
                $scope.wholeObj[$scope.modalIndex] = moddata;
            } else {
                $scope.newjson = moddata;
                var a = moddata;
                switch ($scope.holdObject) {
                    case "invoice":
                        {
                            var newmod = a.invoiceNumber.split(',');
                            _.each(newmod, function (n) {
                                $scope.newjson.invoiceNumber = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "products":
                        {
                            var newmod1 = a.item.split(',');
                            _.each(newmod1, function (n) {
                                $scope.newjson.item = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "LRs":
                        var newmod2 = a.lrNumber.split(',');
                        _.each(newmod2, function (n) {
                            $scope.newjson.lrNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;
                    case "Vehicle":
                        var newmod3 = a.vehicleNumber.split(',');
                        _.each(newmod3, function (n) {
                            $scope.newjson.vehicleNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;

                    default:
                        {
                            $scope.wholeObj.push($scope.newjson);
                        }

                }

            }
        };

        $scope.deleteElements = function (index, data) {
            data.splice(index, 1);
        };


        $scope.submit = function (formData) {
            console.log($scope.formData);
            NavigationService.assignmentSave($scope.formData, function (data) {
                if (data.value === true) {
                    $state.go('assignment-list');
                    toastr.success("Assignment " + formData.name + " created successfully.", "Assignment Created");
                } else {
                    toastr.error("Assignment creation failed.", "Assignment creation error");
                }
            });
        };

    })
    .controller('EditAssignmentCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("assignment-detail");
        $scope.menutitle = NavigationService.makeactive("Assignment");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Assignment"
        };
        $scope.formData = {};
        $scope.formData.status = true;
        $scope.formData.invoice = [];
        $scope.formData.products = [];
        $scope.formData.LRs = [];
        $scope.formData.vehicleNumber = [];
        $scope.formData.others = [];
        $scope.formData.shareWith = [];
        $scope.modalData = {};
        $scope.modalIndex = "";
        $scope.wholeObj = [];
        $scope.addModels = function (dataArray, data) {
            dataArray.push(data);
        };

        NavigationService.getOneModel("Assignment", $stateParams.id, function (data) {
            $scope.formData = data.data;
            $scope.formData.dateOfIntimation = new Date(data.data.dateOfIntimation);
            $scope.formData.dateOfAppointment = new Date(data.data.dateOfAppointment);
            $scope.formData.country = data.data.city.district.state.zone.country._id;
            $scope.formData.zone = data.data.city.district.state.zone._id;
            $scope.formData.state = data.data.city.district.state._id;
            $scope.formData.district = data.data.city.district._id;
            $scope.formData.city = data.data.city._id;
            $scope.formData.insuredOfficer = data.data.insuredOfficer._id;
            console.log($scope.formData.policyDoc);
            console.log($scope.formData);
        });


        $scope.refreshShareWith = function (data, office) {
            var formdata = {};
            formdata.search = data;
            formdata.filter = {
                "postedAt": office
            };
            NavigationService.searchEmployee(formdata, 1, function (data) {
                $scope.shareWith = data.data.results;
            });
        };
        $scope.refreshNature = function (data, causeloss) {
            var formdata = {};
            formdata.search = data;
            formdata.filter = {
                "_id": causeloss
            };
            NavigationService.getNatureLoss(formdata, 1, function (data) {
                $scope.natureLoss = data.data.results;
            });
        };

        $scope.addModal = function (filename, index, holdobj, data, current, wholeObj) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
            } else {
                $scope.modalData = {};
                $scope.modalIndex = "";
            }
            $scope.wholeObj = wholeObj;
            $scope.current = current;
            $scope.holdObject = holdobj;
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        $scope.addElements = function (moddata) {
            if ($scope.modalIndex !== "") {
                $scope.wholeObj[$scope.modalIndex] = moddata;
            } else {
                $scope.newjson = moddata;
                var a = moddata;
                switch ($scope.holdObject) {
                    case "invoice":
                        {
                            var newmod = a.invoiceNumber.split(',');
                            _.each(newmod, function (n) {
                                $scope.newjson.invoiceNumber = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "products":
                        {
                            var newmod1 = a.item.split(',');
                            _.each(newmod1, function (n) {
                                $scope.newjson.item = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "LRs":
                        var newmod2 = a.lrNumber.split(',');
                        _.each(newmod2, function (n) {
                            $scope.newjson.lrNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;
                    case "Vehicle":
                        var newmod3 = a.vehicleNumber.split(',');
                        _.each(newmod3, function (n) {
                            $scope.newjson.vehicleNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;

                    default:
                        {
                            $scope.wholeObj.push($scope.newjson);
                        }

                }

            }
        };

        $scope.deleteElements = function (index, data) {
            data.splice(index, 1);
        };


        $scope.submit = function (formData) {
            console.log($scope.formData);
            NavigationService.assignmentSave($scope.formData, function (data) {
                if (data.value === true) {
                    $state.go('assignment-list');
                    toastr.success("Assignment " + formData.name + " created successfully.", "Assignment Created");
                } else {
                    toastr.error("Assignment creation failed.", "Assignment creation error");
                }
            });
        };

    })

.controller('EditCountryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("country-detail");
    $scope.menutitle = NavigationService.makeactive("Country");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Edit Country"
    };

    NavigationService.getOneCountry($stateParams.id, function (data) {
        $scope.formData = data.data;
        console.log('$scope.oneCountry', $scope.oneCountry);

    });

    $scope.saveCountry = function (formValid) {
        NavigationService.countryEditSave($scope.formData, function (data) {
            if (data.value === true) {
                $state.go('country-list');
                console.log("Check this one");
                toastr.success("Country " + $scope.formData.name + " edited successfully.", "Country Edited");
            } else {
                toastr.error("Country edition failed.", "Country editing error");
            }
        });
    };

})

.controller('headerctrl', function ($scope, TemplateService, $uibModal) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });

})

.controller('languageCtrl', function ($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function () {
        console.log("Language CLicked");

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
});