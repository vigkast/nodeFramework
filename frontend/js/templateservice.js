var templateservicemod = angular.module('templateservicemod', []);
templateservicemod.service('TemplateService', function() {
    this.title = "Home";
    this.meta = "Google";
    this.metadesc = "Home";
    this.isLoader = false;
    this.removeLoaderNum = 0;
    this.removeLoaderTemp = 0;
    var d = new Date();
    this.year = d.getFullYear();

    this.init = function() {
        this.headermenu = "frontend/views/headermenu.html";
        this.header = "frontend/views/header.html";
        this.menu = "frontend/views/menu.html";
        this.isLoader = false;
        this.slider = "frontend/views/slider.html";
        this.content = "frontend/views/content/content.html";
        this.footermenu = "frontend/views/footermenu.html";
        this.footer = "frontend/views/footer.html";
        this.removeLoaderTemp = 0;
        this.removeLoaderNum = 0;
    };

    this.removeLoader = function() {
        this.removeLoaderTemp++;
        if (this.removeLoaderTemp >= this.removeLoaderNum) {
            this.isLoader = false;
        }
    };
    this.getLoader = function() {
        this.isLoader = true;
    };
    this.removeLoaderOn = function(num) {
        this.isLoader = true;
        this.removeLoaderNum = num;
    };

    this.changecontent = function(page) {
        this.init();
        var data = this;
        data.content = "frontend/views/content/" + page + ".html";
        return data;
    };

    this.init();

});
