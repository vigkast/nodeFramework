var templateService = angular.module('templateService', []);
templateService.service('TemplateService', function () {
    this.title = "Home";
    this.meta = "";
    this.metadesc = "";

    var d = new Date();
    this.year = d.getFullYear();

    this.init = function () {
        this.header = "frontend/views/header.html";
        this.menu = "frontend/views/menu.html";
        this.content = "frontend/views/content/content.html";
        this.footer = "frontend/views/footer.html";
    };

    this.getHTML = function (page) {
        this.init();
        var data = this;
        data.content = "frontend/views/" + page;
        return data;
    };

    this.init();

});