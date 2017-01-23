"use strict";

angular.module("AppModule").factory("SearchFactory", SearchFactory);

SearchFactory.$inject = ["$http", "baseURL"];

function SearchFactory(http, baseURL) {
    var srcFactory = {};

    srcFactory.search = function (item) {
        return $http.get({
            url: baseURL + "/country",
            data: {
                name_like: item
            }
        });
    }; //search

    srcFactory.save = function (items) {
        return $http.post({
            url: baseURL + "/selectedCountries",
            params: item
        });
    };

    return srcFactory;

}; //SearchFactory