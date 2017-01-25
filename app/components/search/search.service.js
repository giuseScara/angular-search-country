"use strict";

angular.module("AppModule").factory("SearchFactory", SearchFactory);

SearchFactory.$inject = ["$http", "baseURL"];

function SearchFactory($http, baseURL) {
    var srcFactory = {};

    srcFactory.search = function (item) {
        return $http.get(baseURL + "country", {
            params: {
                name_like: "^" + item
            }
        });
    }; //search

    srcFactory.save = function (items) {
        return $http.post(baseURL + "selectedCountries", items);
    };

    return srcFactory;

}; //SearchFactory